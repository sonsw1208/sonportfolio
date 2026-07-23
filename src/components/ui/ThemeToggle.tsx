"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useLang } from "@/context/LangProvider";
import { useSound } from "@/hooks/useSound";
import { t } from "@/lib/uiStrings";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLang();
  const { playClick } = useSound();

  return (
    <button
      className="w-[42px] h-[42px] rounded-xl border-[1.5px] border-border bg-surface grid place-items-center cursor-pointer text-g600 transition-all hover:border-g400 hover:shadow-sm"
      title={t(lang, "theme")}
      aria-label="Đổi giao diện sáng/tối"
      onClick={() => {
        toggleTheme();
        playClick();
      }}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
