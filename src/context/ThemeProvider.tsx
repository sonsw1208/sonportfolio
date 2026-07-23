"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Giá trị an toàn cho SSR — script chặn FOUC trong layout.tsx đã set
  // thuộc tính data-theme đúng trên <html> trước khi paint; effect dưới
  // đây chỉ đồng bộ lại state React sau khi mount.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    setTheme(attr === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme phải dùng bên trong ThemeProvider");
  return ctx;
}
