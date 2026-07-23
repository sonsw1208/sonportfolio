"use client";

import { useLang } from "@/context/LangProvider";
import { useSound } from "@/hooks/useSound";
import { t } from "@/lib/uiStrings";
import { cn } from "@/lib/cn";

export function LangToggle() {
  const { lang, toggleLang, translating } = useLang();
  const { playClick } = useSound();

  return (
    <button
      className={cn(
        "w-[42px] h-[42px] rounded-xl border-[1.5px] border-border bg-surface grid place-items-center cursor-pointer font-display font-bold text-[0.82rem] tracking-wide text-text transition-all hover:border-g400 hover:text-g600 hover:shadow-sm",
        translating && "opacity-55 pointer-events-none"
      )}
      title={t(lang, "lang")}
      aria-label="Đổi ngôn ngữ"
      onClick={() => {
        toggleLang();
        playClick();
      }}
    >
      {lang === "en" ? "EN" : "VI"}
    </button>
  );
}
