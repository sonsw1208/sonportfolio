"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { profile as baseProfile } from "@/data/profile";
import { works as baseWorks } from "@/data/works";
import { translateProfile, translateWorks } from "@/lib/translate";
import type { SiteProfile, WorksSection } from "@/data/types";

type Lang = "vi" | "en";

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  translating: boolean;
  profile: SiteProfile;
  works: WorksSection;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("vi");
  const [translating, setTranslating] = useState(false);
  const [enProfile, setEnProfile] = useState<SiteProfile | null>(null);
  const [enWorks, setEnWorks] = useState<WorksSection | null>(null);
  const tokenRef = useRef(0);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-lang");
    setLang(attr === "en" ? "en" : "vi");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);
    if (lang !== "en") return;

    const token = ++tokenRef.current;
    setTranslating(true);
    Promise.all([translateProfile(baseProfile), translateWorks(baseWorks)])
      .then(([p, w]) => {
        if (token !== tokenRef.current) return; // có toggle mới hơn xen vào, bỏ kết quả cũ
        setEnProfile(p);
        setEnWorks(w);
      })
      .finally(() => {
        if (token === tokenRef.current) setTranslating(false);
      });
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => {
      const next: Lang = prev === "vi" ? "en" : "vi";
      try {
        localStorage.setItem("lang", next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const activeProfile = lang === "en" && enProfile ? enProfile : baseProfile;
  const activeWorks = lang === "en" && enWorks ? enWorks : baseWorks;

  return (
    <LangContext.Provider
      value={{ lang, toggleLang, translating, profile: activeProfile, works: activeWorks }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang phải dùng bên trong LangProvider");
  return ctx;
}
