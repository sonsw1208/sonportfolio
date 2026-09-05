import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import crypto from "crypto";
import path from "path";

// Ảnh tải lên từ public/admin.html được ghi thành FILE THẬT trong public/uploads/ rồi
// content.json chỉ giữ đường dẫn ngắn (VD "/uploads/ab12cd34.jpg"). Trước đây ảnh nằm
// thẳng trong content.json dạng base64 nên bị đóng gói vào bundle JS — trang tải rất nặng.
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Chỉ nhận đúng các định dạng ảnh web thông dụng; mime lạ bị từ chối thay vì đoán đuôi file.
const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Cùng lý do với /api/content: filesystem trên serverless (Vercel) chỉ đọc.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Tải ảnh chỉ khả dụng khi chạy `npm run dev` cục bộ." },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON không hợp lệ." }, { status: 400 });
  }

  const dataUrl =
    body && typeof body === "object" && "dataUrl" in body
      ? (body as { dataUrl: unknown }).dataUrl
      : null;

  if (typeof dataUrl !== "string") {
    return NextResponse.json({ error: "Thiếu trường dataUrl." }, { status: 400 });
  }

  // [\s\S] thay cho cờ /s: tsconfig đang target ES2017, chưa hỗ trợ cờ dotAll.
  const m = /^data:([\w/+.-]+);base64,([\s\S]+)$/.exec(dataUrl);
  if (!m) {
    return NextResponse.json({ error: "dataUrl phải là data URI base64." }, { status: 400 });
  }

  const ext = EXT_BY_MIME[m[1]];
  if (!ext) {
    return NextResponse.json({ error: `Định dạng không hỗ trợ: ${m[1]}` }, { status: 400 });
  }

  const buf = Buffer.from(m[2], "base64");
  // Đặt tên theo hash nội dung: tải lại đúng ảnh cũ sẽ trùng file, không sinh rác.
  const name = crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16) + "." + ext;

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), buf);

  return NextResponse.json({ url: `/uploads/${name}` });
}
