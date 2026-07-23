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
      aria-pressed={active}
      className={cn(
        // Viền vẽ bằng box-shadow inset chứ KHÔNG dùng `border`: border-transparent ở trạng
        // thái active để lộ nền phía sau thành một đường sẫm quanh mép. box-shadow cũng không
        // chiếm chỗ trong layout nên pill active và không active luôn bằng đúng kích thước.
        "relative isolate overflow-hidden cursor-pointer rounded-full px-5 py-2.5",
        "font-display font-medium text-[0.88rem]",
        // Không transition background-image (gradient không nội suy được, sẽ nhảy giật) —
        // hiệu ứng đổi màu do lớp gradient bên dưới fade opacity đảm nhiệm.
        "transition-[transform,box-shadow,color] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
        active
          ? "text-white shadow-[0_10px_24px_rgba(16,185,129,0.32)]"
          : "bg-surface text-text-soft shadow-[inset_0_0_0_1.5px_var(--border)] hover:text-g700 hover:shadow-[inset_0_0_0_1.5px_var(--g400),0_6px_16px_rgba(16,185,129,0.14)]",
        className
      )}
      onClick={(e) => {
        playClick();
        onClick?.(e);
      }}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 rounded-full bg-grad-primary",
          "transition-opacity duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
          active ? "opacity-100" : "opacity-0"
        )}
      />
      {children}
    </button>
  );
}
