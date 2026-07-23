import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { LangProvider } from "@/context/LangProvider";
import { SoundProvider } from "@/context/SoundProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Son Editor Portfolio",
  description:
    "Portfolio của một Video Editor chuyên nghiệp — editing, showreel, cinematic, motion graphics.",
};

const THEME_INIT = `
(function(){try{
  var t=localStorage.getItem('theme');
  if(t!=='light'&&t!=='dark')t=(window.matchMedia&&matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light';
  document.documentElement.setAttribute('data-theme',t);
  var l=localStorage.getItem('lang');if(l!=='vi'&&l!=='en')l='vi';
  document.documentElement.setAttribute('data-lang',l);document.documentElement.lang=l;
  if(location.search.indexOf('shot')>-1)document.documentElement.classList.add('static-mode');
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <LangProvider>
            <SoundProvider>{children}</SoundProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
