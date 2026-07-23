"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useSound } from "@/hooks/useSound";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-display font-semibold text-[0.95rem] transition-all duration-300 ease-out cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-grad-primary text-white shadow-[0_10px_26px_rgba(16,185,129,0.34)] hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(16,185,129,0.44)]",
  ghost:
    "bg-surface text-text border-[1.5px] border-border hover:-translate-y-[3px] hover:border-g400 hover:shadow-sm",
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", children, className, ...rest } = props;
  const { playClick } = useSound();

  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { onClick, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchorRest}
        href={props.href}
        className={classes}
        onClick={(e) => {
          playClick();
          onClick?.(e);
        }}
      >
        {children}
      </a>
    );
  }

  const { onClick, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...buttonRest}
      className={classes}
      onClick={(e) => {
        playClick();
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}
