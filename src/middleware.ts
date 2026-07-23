import { NextResponse } from "next/server";

/**
 * Trang quản trị chỉ dành cho lúc chạy `npm run dev` trên máy.
 *
 * Khi deploy (Vercel), `public/admin.html` vốn là file tĩnh nên ai biết đường dẫn cũng mở
 * được — nhìn thấy toàn bộ nội dung và tải được file backup JSON. Ghi thì họ không ghi được
 * (POST /api/content đã trả 403 ở production), nhưng vẫn không có lý do gì để lộ trang này.
 * Middleware trả 404 cho cả trang admin lẫn API nội dung khi chạy production.
 *
 * Sửa nội dung: chạy `npm run dev` ở máy → sửa ở http://localhost:3000/admin.html →
 * commit `src/data/content.json` → push → Vercel tự deploy lại.
 */
export function middleware() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin.html", "/api/content"],
};
