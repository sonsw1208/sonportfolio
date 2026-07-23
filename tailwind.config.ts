import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        surface: "var(--surface)",
        border: "var(--border)",
        text: "var(--text)",
        "text-soft": "var(--text-soft)",
        g300: "var(--g300)",
        g400: "var(--g400)",
        g500: "var(--g500)",
        g600: "var(--g600)",
        g700: "var(--g700)",
        g900: "var(--g900)",
        teal: "var(--teal)",
      },
      backgroundImage: {
        "grad-primary": "var(--grad-primary)",
        "grad-text": "var(--grad-text)",
        "grad-accent": "var(--grad-accent)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
      },
      maxWidth: {
        container: "var(--maxw)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        scrollx: {
          to: { transform: "translateX(-50%)" },
        },
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        // Vòng sóng lan ra từ nút play để gợi ý "bấm được"
        pulsering: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "70%": { transform: "scale(1.55)", opacity: "0" },
          "100%": { transform: "scale(1.55)", opacity: "0" },
        },
      },
      animation: {
        scrollx: "scrollx 26s linear infinite",
        fade: "fade .3s ease",
        pulsering: "pulsering 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
