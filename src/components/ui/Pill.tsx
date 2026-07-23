"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { useSound } from "@/hooks/useSound";

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Pill({ active, className, onClick, children, ...rest }: PillProps) {
  const { playClick } = useSound();
  return (
    <button
      {...rest}
      className={cn(
        "font-display font-medium text-[0.88rem] rounded-full px-5 py-2.5 border-[1.5px] transition-all duration-200 cursor-pointer",
        active
          ? "bg-grad-primary text-white border-transparent shadow-[0_8px_20px_rgba(16,185,129,0.3)]"
          : "bg-surface text-text-soft border-border hover:border-g400 hover:text-g700",
        className
      )}
      onClick={(e) => {
        playClick();
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}
