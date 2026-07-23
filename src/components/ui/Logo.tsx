import Image from "next/image";
import { Play } from "lucide-react";
import type { Brand } from "@/data/types";

/**
 * Wordmark xếp 2 dòng kiểu hãng phim: từ đầu của tên viết lớn, gạch gradient mảnh,
 * rồi phần còn lại viết hoa giãn rộng. Tên chỉ có 1 từ thì rút về 1 dòng.
 */
export function Logo({ brand }: { brand: Brand }) {
  const parts = brand.name.trim().split(/\s+/);
  const first = parts[0] || "";
  const rest = parts.slice(1).join(" ");

  return (
    <span className="flex items-center gap-[11px]" aria-label={brand.name}>
      <span className="w-[34px] h-[34px] rounded-[10px] bg-grad-primary grid place-items-center shadow-[0_6px_16px_rgba(16,185,129,0.4)] overflow-hidden flex-none">
        {brand.logoImage ? (
          <Image
            src={brand.logoImage}
            alt=""
            width={34}
            height={34}
            className="w-full h-full object-cover"
          />
        ) : (
          <Play size={18} className="text-white fill-white ml-0.5" />
        )}
      </span>

      <span aria-hidden className="flex flex-col items-stretch leading-none">
        <span className="font-display font-bold uppercase text-[1.02rem] sm:text-[1.12rem] tracking-[-0.01em]">
          {first}
        </span>
        {rest && (
          <>
            <span className="h-[2px] my-[4px] rounded-full bg-grad-primary" />
            {/* margin-right âm bù phần letter-spacing thừa sau ký tự cuối, để hai dòng
                thẳng mép phải với nhau thay vì lệch một khoảng trống */}
            <span className="font-display font-semibold uppercase text-[0.53rem] sm:text-[0.57rem] tracking-[0.34em] text-text-soft mr-[-0.34em]">
              {rest}
            </span>
          </>
        )}
      </span>
    </span>
  );
}
