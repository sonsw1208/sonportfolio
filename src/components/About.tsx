"use client";

import Image from "next/image";
import { useLang } from "@/context/LangProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Highlighted } from "@/components/ui/GradientText";
import { Eyebrow } from "@/components/ui/Eyebrow";

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
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow className="text-g600">
              {about.eyebrow}
            </Eyebrow>
          </Reveal>
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
        </div>
      </div>
    </section>
  );
}
