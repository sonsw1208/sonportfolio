"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { useLang } from "@/context/LangProvider";
import { useSound } from "@/hooks/useSound";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { VideoEmbed } from "@/components/VideoEmbed";
import { t } from "@/lib/uiStrings";
import type { WorkItem } from "@/data/types";

export function Works() {
  const { works, lang } = useLang();
  const { playClick } = useSound();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<WorkItem | null>(null);

  const items = works.items.filter((w) => filter === "all" || w.cat === filter);

  return (
    <section id="works" className="py-16 sm:py-24">
      <div className="w-full max-w-container mx-auto px-6">
        <div className="flex justify-between items-end gap-6 flex-wrap mb-11">
          <div>
            <Reveal className="eyebrow text-g600">Portfolio</Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-[clamp(2rem,4.4vw,3.2rem)] font-bold mt-3.5">{works.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="text-text-soft max-w-[44ch]">
            {works.subtitle}
          </Reveal>
        </div>

        <Reveal className="flex gap-2.5 flex-wrap mb-9">
          {works.filters.map((f) => (
            <Pill key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label}
            </Pill>
          ))}
        </Reveal>

        {items.length === 0 ? (
          <p className="text-center text-text-soft py-10">{t(lang, "empty")}</p>
        ) : (
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((w) => (
              <RevealItem key={w.id}>
                <button
                  className="text-left w-full rounded-md overflow-hidden bg-surface border border-border shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md cursor-pointer group"
                  onClick={() => {
                    playClick();
                    setSelected(w);
                  }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.07]"
                      style={
                        w.thumb
                          ? { backgroundImage: `url('${w.thumb}')` }
                          : { background: w.hue || "linear-gradient(150deg,#0b3b2e,#065f46,#0e7c5a)" }
                      }
                    />
                    <span className="absolute left-3 top-3 bg-white/90 text-g700 text-[0.7rem] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg font-display">
                      {w.catLabel}
                    </span>
                    <span className="absolute right-3 bottom-3 bg-[rgba(11,31,22,.72)] text-white text-[0.74rem] font-semibold px-2.5 py-1 rounded-lg font-display">
                      {w.dur}
                    </span>
                    <div
                      className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(180deg, rgba(6,78,59,.05), rgba(6,78,59,.45))",
                      }}
                    >
                      <div className="w-[58px] h-[58px] rounded-full bg-white/95 grid place-items-center text-g600 scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play size={22} className="ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="p-[18px]">
                    <h3 className="text-[1.14rem] font-semibold mb-1">{w.title}</h3>
                    <p className="text-[0.86rem] text-text-soft">{w.desc}</p>
                    <div className="mt-3 text-[0.76rem] text-g600 font-semibold font-display flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-g400" />
                      {w.role}
                    </div>
                  </div>
                </button>
              </RevealItem>
            ))}
          </RevealStagger>
        )}
      </div>

      <VideoEmbed work={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
