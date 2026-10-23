import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import crypto from "crypto";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Lấy thumbnail chỉ khả dụng khi chạy dev cục bộ." }, { status: 403 });
  }
  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "JSON không hợp lệ." }, { status: 400 }); }
  const fileId = body && typeof body === "object" && "fileId" in body ? body.fileId : null;
  if (typeof fileId !== "string" || !/^[a-zA-Z0-9_-]{10,200}$/.test(fileId)) {
    return NextResponse.json({ error: "ID Google Drive không hợp lệ." }, { status: 400 });
  }
  try {
    // Fixed upstream host; never fetch an arbitrary user-provided URL.
    const response = await fetch(`https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w900`, {
      signal: AbortSignal.timeout(15000), cache: "no-store",
    });
    const mime = (response.headers.get("content-type") || "").split(";")[0].trim();
    const ext = ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as Record<string, string>)[mime];
    if (!response.ok || !ext || !response.body) {
      await response.body?.cancel();
      return NextResponse.json({ error: "Drive chưa có thumbnail hoặc video chưa được chia sẻ công khai. Bạn có thể thử lại sau." }, { status: 422 });
    }
    const chunks: Uint8Array[] = [];
    let size = 0;
    const reader = response.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 5 * 1024 * 1024) { await reader.cancel(); throw new Error("Thumbnail quá lớn."); }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
    const image = Buffer.concat(chunks);
    // Reject HTML error pages and unexpected payloads even if the upstream MIME is wrong.
    const valid = (ext === "jpg" && image[0] === 0xff && image[1] === 0xd8 && image[2] === 0xff)
      || (ext === "png" && image.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])))
      || (ext === "webp" && image.toString("ascii", 0, 4) === "RIFF" && image.toString("ascii", 8, 12) === "WEBP");
    if (!valid) return NextResponse.json({ error: "Drive không trả về ảnh thumbnail hợp lệ." }, { status: 422 });
    const name = crypto.createHash("sha256").update(image).digest("hex").slice(0, 16) + "." + ext;
    const folder = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(folder, { recursive: true });
    await fs.writeFile(path.join(folder, name), image);
    return NextResponse.json({ url: `/uploads/${name}` });
  } catch {
    return NextResponse.json({ error: "Không lấy được thumbnail từ Drive. Kiểm tra kết nối và thử lại." }, { status: 502 });
  }
}
