"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, Clapperboard, Play } from "lucide-react";
import { useLang } from "@/context/LangProvider";
import { useSound } from "@/hooks/useSound";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Highlighted } from "@/components/ui/GradientText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VideoEmbed } from "@/components/VideoEmbed";

export function Hero() {
  const { profile } = useLang();
  const { hero, stats, marquee } = profile;
  const { playClick } = useSound();
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <section id="home" className="relative overflow-hidden pt-[134px] pb-[90px] sm:pt-[134px]">
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 8%, rgba(52,211,153,.30), transparent 60%), radial-gradient(55% 50% at 12% 30%, rgba(20,184,166,.18), transparent 60%), radial-gradient(70% 60% at 55% 105%, rgba(110,231,183,.22), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 40%, #000, transparent 75%)",
          maskImage: "radial-gradient(70% 60% at 50% 40%, #000, transparent 75%)",
        }}
      />

      <div className="w-full max-w-container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-11 lg:gap-14 items-center">
        <div>
          <Reveal>
            <Eyebrow icon={Clapperboard} className="text-g600">
              {hero.eyebrow}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-[clamp(2.6rem,6vw,4.6rem)] font-bold my-5 leading-[1.05]">
              <Highlighted text={hero.title} highlight={hero.highlight} />
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-[1.12rem] text-text-soft max-w-[33ch] mb-8">{hero.lead}</p>
          </Reveal>
          <Reveal delay={0.24} className="flex gap-3.5 flex-wrap">
            <Button href="#works">
              {hero.ctaPrimary}
              <ArrowDown size={18} />
            </Button>
            <Button href="#contact" variant="ghost">
              {hero.ctaSecondary}
            </Button>
          </Reveal>
          <Reveal delay={0.32} className="flex gap-8 flex-wrap mt-11">
            {stats.map((s, i) => (
              <div key={i}>
                <b className="grad-text font-display text-[1.8rem] font-bold block leading-none">
                  {s.value}
                </b>
                <span className="text-[0.82rem] text-text-soft">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.16} className="relative max-w-[420px] mx-auto lg:max-w-none w-full">
          <div
            className="relative rounded-lg overflow-hidden shadow-lg"
            style={{
              aspectRatio: "4/5",
              background: "linear-gradient(160deg,#064e3b,#065f46 40%,#0b3b2e)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 60% at 50% 20%, rgba(52,211,153,.4), transparent 60%)",
              }}
            />
            <div className="absolute top-[18px] left-[18px] z-[2] flex items-center gap-2 rounded-full bg-white/10 border border-white/25 backdrop-blur-md px-4 py-2 text-white font-display font-semibold text-[0.8rem]">
              <span className="w-2 h-2 rounded-full bg-g300 shadow-[0_0_0_4px_rgba(110,231,183,.3)]" />
              {hero.badge}
            </div>
            {hero.portraitImage ? (
              <Image
                src={hero.portraitImage}
                alt="Chân dung"
                fill
                className="object-cover"
              />
            ) : (
              <svg
                viewBox="0 0 200 250"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[88%] h-auto opacity-90"
              >
                <ellipse cx="100" cy="96" rx="46" ry="52" fill="rgba(255,255,255,.16)" />
                <path
                  d="M18 250c0-52 37-84 82-84s82 32 82 84H18z"
                  fill="rgba(255,255,255,.16)"
                />
              </svg>
            )}
          </div>

          <div className="absolute left-[-8px] sm:left-[-34px] bottom-11 w-[180px] sm:w-[230px] bg-surface border border-border rounded-md p-4 shadow-md z-[3]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-grad-primary flex-none" />
              <div>
                <b className="font-display text-[0.95rem] block">{hero.floatTitle}</b>
                <span className="text-[0.76rem] text-text-soft">{hero.floatSub}</span>
              </div>
            </div>
            <div className="flex gap-1.5 mt-3.5 items-end h-[34px]">
              {[40, 70, 100, 55, 85, 35, 65, 90].map((h, i) => (
                <i key={i} className="flex-1 bg-grad-accent rounded-sm opacity-85" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          <button
            className="absolute right-2 sm:right-[-22px] top-[34px] w-[62px] h-[62px] sm:w-[74px] sm:h-[74px] rounded-full bg-surface shadow-md grid place-items-center text-g600 z-[3] cursor-pointer transition-transform hover:scale-105"
            aria-label="Xem showreel"
            onClick={() => {
              playClick();
              setShowreelOpen(true);
            }}
          >
            {/* Hai vòng sóng lệch pha nhau, chạy liên tục để nút trông "bấm được".
                Đặt trong button nhưng pointer-events-none để không cản cú click.
                Tự tắt khi prefers-reduced-motion hoặc chụp ảnh tĩnh — xem globals.css. */}
            <span
              aria-hidden
              className="pulse-ring absolute inset-0 rounded-full border-2 border-g400 animate-pulsering pointer-events-none"
            />
            <span
              aria-hidden
              style={{ animationDelay: "1.4s" }}
              className="pulse-ring absolute inset-0 rounded-full border-2 border-g400 animate-pulsering pointer-events-none"
            />
            <Play size={26} className="ml-0.5 fill-current relative" />
          </button>
        </Reveal>
      </div>

      <Reveal>
        <Marquee items={marquee} />
      </Reveal>

      <VideoEmbed
        work={
          showreelOpen
            ? { title: "Showreel", driveFileId: hero.showreelDriveFileId }
            : null
        }
        onClose={() => setShowreelOpen(false)}
      />
    </section>
  );
}
