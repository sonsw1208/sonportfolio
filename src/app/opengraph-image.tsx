import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = "Son Media: Video Editor Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Chữ trong ảnh chỉ dùng ASCII (không dấu tiếng Việt): font mặc định của next/og (Satori)
// không đảm bảo có glyph dấu tiếng Việt, dễ vỡ chữ. Text meta thường (title/description ở
// layout.tsx) không bị giới hạn này vì đó là chuỗi HTML thường, không phải ảnh raster.
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "84px",
          background: "linear-gradient(135deg, #064e3b 0%, #047857 45%, #0b3b2e 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 60,
              height: 60,
              borderRadius: 18,
              background: "linear-gradient(135deg, #059669, #10b981 55%, #6ee7b7 100%)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7L8 5z" fill="#ffffff" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
            {profile.brand.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 920,
            marginTop: 56,
          }}
        >
          Video Editor & Storyteller
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            opacity: 0.82,
            marginTop: 26,
            maxWidth: 780,
          }}
        >
          Editing · Color Grading · Motion Graphics
        </div>
      </div>
    ),
    { ...size }
  );
}
