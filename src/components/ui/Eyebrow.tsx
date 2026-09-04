import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Nhãn nhỏ viết hoa đứng trước tiêu đề mỗi section.
 * Màu chữ do nơi dùng truyền vào (text-g600 trên nền sáng, text-g300 trên nền xanh đậm)
 * — xem ghi chú về specificity của class .eyebrow trong globals.css.
 */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}
