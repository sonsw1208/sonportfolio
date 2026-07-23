"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { profile } from "@/data/profile";

interface SoundContextValue {
  soundOn: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundOn, setSoundOn] = useState<boolean>(profile.soundDefault !== false);

  useEffect(() => {
    try {
      const s = localStorage.getItem("soundOn");
      if (s !== null) setSoundOn(s !== "false");
    } catch {
      // ignore
    }
  }, []);

  const toggleSound = () => {
    setSoundOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("soundOn", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <SoundContext.Provider value={{ soundOn, toggleSound }}>{children}</SoundContext.Provider>
  );
}

export function useSoundContext(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSoundContext phải dùng bên trong SoundProvider");
  return ctx;
}
