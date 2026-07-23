"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { useLang } from "@/context/LangProvider";
import { t } from "@/lib/uiStrings";
import { cn } from "@/lib/cn";

export function SoundToggle() {
  const { soundOn, toggleSound, playClick } = useSound();
  const { lang } = useLang();

  return (
    <button
      className={cn(
        "w-[42px] h-[42px] rounded-xl border-[1.5px] border-border bg-surface grid place-items-center cursor-pointer text-g600 transition-all hover:border-g400 hover:shadow-sm",
        !soundOn && "text-text-soft"
      )}
      title={t(lang, "sound")}
      aria-label="Bật/tắt âm thanh"
      onClick={() => {
        const turningOn = !soundOn;
        toggleSound();
        if (turningOn) playClick(true);
      }}
    >
      {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
