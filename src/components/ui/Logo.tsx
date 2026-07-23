import Image from "next/image";
import { Play } from "lucide-react";
import type { Brand } from "@/data/types";

export function Logo({ brand }: { brand: Brand }) {
  return (
    <span className="flex items-center gap-[11px] font-display font-bold text-[1.15rem]">
      <span className="w-[34px] h-[34px] rounded-[10px] bg-grad-primary grid place-items-center shadow-[0_6px_16px_rgba(16,185,129,0.4)] overflow-hidden flex-none">
        {brand.logoImage ? (
          <Image
            src={brand.logoImage}
            alt="logo"
            width={34}
            height={34}
            className="w-full h-full object-cover"
          />
        ) : (
          <Play size={18} className="text-white fill-white ml-0.5" />
        )}
      </span>
      {brand.name}
      <span className="text-g500">.</span>
    </span>
  );
}
