import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Nguồn sự thật duy nhất cho nội dung site — src/data/profile.ts và works.ts import
// trực tiếp file này. public/admin.html đọc/ghi qua route này khi chạy `npm run dev`.
const CONTENT_PATH = path.join(process.cwd(), "src", "data", "content.json");

export const dynamic = "force-dynamic";

export async function GET() {
  const raw = await fs.readFile(CONTENT_PATH, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(req: NextRequest) {
  // Ghi file chỉ khả dụng khi chạy dev cục bộ — môi trường serverless (VD Vercel) có
  // filesystem chỉ đọc, không thể lưu vĩnh viễn theo cách này.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error:
          "Chỉnh nội dung chỉ khả dụng khi chạy `npm run dev` cục bộ. Sửa xong hãy commit & deploy lại.",
      },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON không hợp lệ." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Dữ liệu phải là một object." }, { status: 400 });
  }

  await fs.writeFile(CONTENT_PATH, JSON.stringify(body, null, 2) + "\n", "utf-8");
  return NextResponse.json({ ok: true });
}
