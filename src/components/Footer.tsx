"use client";

import { useLang } from "@/context/LangProvider";
import { useSound } from "@/hooks/useSound";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const { profile } = useLang();
  const { playClick } = useSound();

  return (
    <footer className="py-10 border-t border-border">
      <div className="w-full max-w-container mx-auto px-6 flex justify-between items-center gap-5 flex-wrap">
        <a href="#home" className="text-[1rem] cursor-pointer" onClick={() => playClick()}>
          <Logo brand={profile.brand} />
        </a>
        <small className="text-text-soft text-[0.84rem]">{profile.footer}</small>
      </div>
    </footer>
  );
}
