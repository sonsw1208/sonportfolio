import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { LangProvider } from "@/context/LangProvider";
import { SoundProvider } from "@/context/SoundProvider";
import { profile } from "@/data/profile";

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

const SITE_URL = "https://www.lesonmedia.com";
const SITE_DESCRIPTION =
  "Son Media là video editor chuyên nghiệp: editing, showreel, cinematic, motion graphics.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: profile.brand.name,
  description: SITE_DESCRIPTION,
  // Favicon để ở public/ (không phải src/app/) — file icon trong app/ đi qua
  // next-metadata-route-loader, loader này nội suy đường dẫn tuyệt đối vào một chuỗi
  // single-quoted mà không escape, nên vỡ cú pháp khi thư mục cha có dấu nháy đơn
  // (VD "Note's Son"). Khai báo tay như dưới đây tránh hoàn toàn loader đó.
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: profile.brand.name,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: profile.brand.name,
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.brand.name,
    description: SITE_DESCRIPTION,
  },
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
