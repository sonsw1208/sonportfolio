import content from "./content.json";
import type { SiteProfile } from "./types";

// Nguồn sự thật thật sự là content.json (được /api/content ghi trực tiếp khi sửa qua
// public/admin.html). File này chỉ gán type + tách phần "works" ra khỏi phần còn lại.
export const profile: SiteProfile = {
  brand: content.brand,
  hero: content.hero,
  stats: content.stats,
  marquee: content.marquee,
  about: content.about,
  contact: content.contact,
  footer: content.footer,
  soundDefault: content.soundDefault,
};
