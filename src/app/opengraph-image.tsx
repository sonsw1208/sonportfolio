import { ImageResponse } from "next/og";

export const alt = "Video Editor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Ảnh preview cố tình chỉ có MỘT dòng chữ: tên thương hiệu và mô tả đã nằm ngay dưới ảnh
// trong thẻ preview (og:title / og:description ở layout.tsx), nhắc lại trong ảnh là thừa.
// Chữ chỉ dùng ASCII: font mặc định của next/og (Satori) không đảm bảo có glyph dấu tiếng Việt.
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #064e3b 0%, #047857 45%, #0b3b2e 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -1 }}>
          Video Editor
        </div>
      </div>
    ),
    { ...size }
  );
}
