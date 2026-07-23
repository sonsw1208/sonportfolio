"use client";

import { useCallback, useRef } from "react";
import { useSoundContext } from "@/context/SoundProvider";

type ExtendedWindow = Window & { webkitAudioContext?: typeof AudioContext };

export function useSound() {
  const { soundOn, toggleSound } = useSoundContext();
  const ctxRef = useRef<AudioContext | null>(null);

  const tone = useCallback(
    (freq: number, dur: number, vol: number, force = false) => {
      if (!soundOn && !force) return;
      try {
        if (!ctxRef.current) {
          const w = window as ExtendedWindow;
          const Ctx = window.AudioContext || w.webkitAudioContext;
          if (!Ctx) return;
          ctxRef.current = new Ctx();
        }
        const ctx = ctxRef.current;
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur);
      } catch {
        // ignore — Web Audio không khả dụng
      }
    },
    [soundOn]
  );

  const playClick = useCallback(
    (force = false) => {
      tone(660, 0.12, 0.05, force);
      setTimeout(() => tone(990, 0.09, 0.035, force), 40);
    },
    [tone]
  );

  return { playClick, soundOn, toggleSound };
}
