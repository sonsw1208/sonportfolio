import { Link2 } from "lucide-react";
import type { SocialType } from "@/data/types";

// lucide-react không cung cấp logo thương hiệu (YouTube/Instagram/Vimeo/TikTok/Facebook)
// nên giữ nguyên các path SVG thủ công từ bản gốc cho nhóm icon mạng xã hội.
const PATHS: Partial<Record<SocialType, string>> = {
  youtube:
    "M23 12s0-3.5-.4-5.1a2.7 2.7 0 0 0-1.9-1.9C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.7.5A2.7 2.7 0 0 0 1.4 6.9C1 8.5 1 12 1 12s0 3.5.4 5.1a2.7 2.7 0 0 0 1.9 1.9c1.8.5 8.7.5 8.7.5s6.9 0 8.7-.5a2.7 2.7 0 0 0 1.9-1.9C23 15.5 23 12 23 12zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z",
  vimeo:
    "M22 7.4c-.1 2.1-1.6 5-4.4 8.6-2.9 3.8-5.4 5.7-7.4 5.7-1.3 0-2.3-1.2-3.2-3.5L5.3 12c-.6-2.3-1.3-3.5-2-3.5-.2 0-.7.3-1.6.9L1 8.2c1-.9 1.9-1.7 2.9-2.6C5.1 4.5 6 4 6.6 4c1.5-.2 2.4.9 2.7 3.1.4 2.5.6 4 .8 4.6.5 2.1 1 3.1 1.6 3.1.5 0 1.1-.7 2-2.2.9-1.5 1.4-2.6 1.5-3.4.1-1.3-.4-1.9-1.5-1.9-.5 0-1 .1-1.6.4C13.6 5.3 15.5 4 18.1 4c1.9.1 2.8 1.2 3.9 3.4z",
  tiktok:
    "M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.6c0 5-3.9 6.9-7 5.3-2-1-2.7-3.4-1.9-5.5.8-2 3-3 5.3-2.5v2.7c-.4-.1-.9-.2-1.3-.1-1 .1-1.7.9-1.6 2 .1 1 1 1.7 2 1.6 1.1-.1 1.7-1 1.7-2.1V3H16z",
  facebook:
    "M14 9h3l.5-3H14V4.5c0-.8.3-1.5 1.6-1.5H17V.4C16.6.3 15.6.2 14.5.2 12 .2 10.4 1.6 10.4 4.3V6H7.5v3h2.9v9H14V9z",
};

export function SocialIcon({ type, size = 20 }: { type: SocialType; size?: number }) {
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  const d = PATHS[type];
  if (!d) return <Link2 size={size} />;

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d={d} />
    </svg>
  );
}
