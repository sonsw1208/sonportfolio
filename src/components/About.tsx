"use client";

import Image from "next/image";
import { useLang } from "@/context/LangProvider";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { Highlighted } from "@/components/ui/GradientText";

export function About() {
  const { profile } = useLang();
  const { about } = profile;

  return (
    <section id="about" className="py-16 sm:py-24 bg-bg-soft relative">
      <div className="w-full max-w-container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[.9fr_1.1fr] gap-10 lg:gap-[60px] items-center">
        <Reveal className="relative max-w-[420px] mx-auto lg:max-w-none w-full">
          <div
            className="relative rounded-lg overflow-hidden shadow-lg"
            style={{
              aspectRatio: "1/1",
              background: "linear-gradient(160deg,#065f46,#0b3b2e)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 60% at 50% 15%, rgba(52,211,153,.35), transparent 60%)",
              }}
            />
            {about.photo ? (
              <Image src={about.photo} alt="Ảnh về mình" fill className="object-cover" />
            ) : (
              <svg
                viewBox="0 0 200 200"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] opacity-90"
              >
                <ellipse cx="100" cy="78" rx="42" ry="46" fill="rgba(255,255,255,.16)" />
                <path d="M22 200c0-46 34-74 78-74s78 28 78 74H22z" fill="rgba(255,255,255,.16)" />
              </svg>
            )}
            <div className="absolute right-[18px] bottom-[18px] z-[2] rounded-sm bg-white/10 border border-white/25 backdrop-blur-md text-white px-[18px] py-3.5">
              <b className="font-display text-2xl block leading-none">{about.ringValue}</b>
              <span className="text-[0.72rem] opacity-85">{about.ringLabel}</span>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal className="eyebrow text-g600">{about.eyebrow}</Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold my-3.5 mb-5">
              <Highlighted text={about.title} highlight={about.highlight} />
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            {about.bio.map((p, i) => (
              <p key={i} className="text-text-soft mb-3.5">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.24} className="mt-7">
            <h4 className="font-display text-[0.78rem] tracking-[0.16em] uppercase text-text-soft mb-4">
              {about.skillsTitle}
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {about.skills.map((s, i) => (
                <span
                  key={i}
                  className="bg-surface border border-border rounded-full px-[18px] py-[9px] font-display font-medium text-[0.86rem] flex items-center gap-2 transition-all hover:border-g400 hover:shadow-sm hover:-translate-y-0.5"
                >
                  <span className="w-2 h-2 rounded-full bg-grad-accent" />
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-[34px]">
            {about.statCards.map((s, i) => (
              <RevealItem key={i}>
                <div className="bg-surface border border-border rounded-sm p-5 shadow-sm h-full">
                  <b className="font-display text-[2rem] font-bold block">
                    <em className="not-italic grad-text">{s.value}</em>
                  </b>
                  <span className="text-[0.8rem] text-text-soft">{s.label}</span>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
