import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Nhãn nhỏ viết hoa đứng trước tiêu đề mỗi section, kèm icon.
 * Màu chữ do nơi dùng truyền vào (text-g600 trên nền sáng, text-g300 trên nền xanh đậm)
 * — xem ghi chú về specificity của class .eyebrow trong globals.css.
 */
export function Eyebrow({
  icon: Icon,
  className,
  children,
}: {
  icon: LucideIcon;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn("eyebrow", className)}>
      <Icon size={15} strokeWidth={2.5} aria-hidden className="shrink-0" />
      {children}
    </span>
  );
}
