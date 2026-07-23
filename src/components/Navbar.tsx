"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { useLang } from "@/context/LangProvider";
import { useSound } from "@/hooks/useSound";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "#home", label: "HOME" },
  { href: "#works", label: "WORKS" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

export function Navbar() {
  const { profile } = useLang();
  const { playClick } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    sectionsRef.current = Array.from(document.querySelectorAll("section[id]"));

    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      let cur = "home";
      sectionsRef.current.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 140) cur = s.id;
      });
      setActive(cur);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 h-[74px] z-[100] flex items-center bg-[var(--nav-bg)] backdrop-blur-2xl border-b border-transparent transition-[border-color,box-shadow,background-color] duration-300",
        scrolled && "border-border shadow-[0_6px_24px_rgba(6,78,59,0.05)]"
      )}
    >
      <div className="w-full max-w-container mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          className="cursor-pointer"
          onClick={() => {
            playClick();
            setOpen(false);
          }}
        >
          <Logo brand={profile.brand} />
        </a>

        <nav
          className={cn(
            "sm:flex sm:static sm:flex-row sm:items-center sm:gap-1.5 sm:bg-transparent sm:border-0 sm:p-0 sm:shadow-none sm:w-auto",
            open
              ? "flex absolute top-[74px] left-0 right-0 z-50 flex-col items-stretch gap-1 bg-surface border-b border-border p-3.5 px-6 shadow-md w-full"
              : "hidden"
          )}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "font-display font-medium text-[0.92rem] px-4 py-2.5 rounded-full text-text-soft transition-colors hover:text-g700 hover:bg-bg-soft",
                active === l.href.slice(1) && "text-g700 bg-bg-soft"
              )}
              onClick={() => {
                playClick();
                setOpen(false);
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3.5">
          <LangToggle />
          <ThemeToggle />
          <SoundToggle />
          <button
            className="sm:hidden w-[42px] h-[42px] rounded-xl border-[1.5px] border-border bg-surface cursor-pointer grid place-items-center"
            aria-label="Menu"
            onClick={() => {
              setOpen((v) => !v);
              playClick();
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
