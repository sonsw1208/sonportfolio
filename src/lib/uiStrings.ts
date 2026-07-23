export const UI_STRINGS = {
  vi: {
    empty: "Chưa có sản phẩm nào ở mục này.",
    soon: "Video đang được cập nhật",
    sound: "Bật/tắt âm thanh",
    theme: "Giao diện sáng/tối",
    lang: "Chuyển sang tiếng Anh",
  },
  en: {
    empty: "No projects in this category yet.",
    soon: "Video coming soon",
    sound: "Toggle sound",
    theme: "Light / Dark mode",
    lang: "Switch to Vietnamese",
  },
} as const;

export type UiLang = keyof typeof UI_STRINGS;

export function t(lang: UiLang, key: keyof (typeof UI_STRINGS)["vi"]): string {
  return UI_STRINGS[lang][key];
}
