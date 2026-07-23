"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { useLang } from "@/context/LangProvider";
import { useSound } from "@/hooks/useSound";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Eyebrow } from "@/components/ui/Eyebrow";

// Nút email và nút gọi phải giống hệt nhau về kích thước lẫn màu — giữ chung một chuỗi class.
const CTA_CLASS =
  "inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-display font-semibold text-[0.95rem] bg-white text-g700 transition-transform hover:-translate-y-[3px]";

export function Contact() {
  const { profile } = useLang();
  const { contact } = profile;
  const { playClick } = useSound();

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="w-full max-w-container mx-auto px-6">
        <Reveal
          className="relative overflow-hidden text-center text-white rounded-lg px-6 py-[52px] sm:px-[50px] sm:py-[70px] shadow-lg"
          style={{ background: "linear-gradient(160deg,#064e3b,#047857 55%,#0b3b2e)" }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "radial-gradient(60% 80% at 50% 0%, rgba(52,211,153,.4), transparent 60%)",
            }}
          />
          <div className="relative">
            <Eyebrow icon={MessageCircle} className="text-g300">
              {contact.eyebrow}
            </Eyebrow>
            <h2 className="text-[clamp(2.1rem,4.6vw,3.4rem)] font-bold my-[18px] whitespace-pre-line">
              {contact.heading}
            </h2>
            <p className="text-white/80 max-w-[46ch] mx-auto mb-[34px]">{contact.text}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`mailto:${contact.email}`}
                className={CTA_CLASS}
                onClick={() => playClick()}
              >
                <Mail size={18} />
                {contact.email}
              </a>
              {contact.phone && (
                <a
                  // tel: chỉ nhận chữ số và dấu +, bỏ mọi khoảng trắng/dấu chấm người dùng gõ
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                  className={CTA_CLASS}
                  onClick={() => playClick()}
                >
                  <Phone size={18} />
                  {contact.phone}
                </a>
              )}
            </div>
            <div className="flex gap-3.5 justify-center mt-[34px]">
              {contact.socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.type}
                  className="w-[46px] h-[46px] rounded-xl bg-white/10 border border-white/20 grid place-items-center text-white transition-all hover:bg-white/20 hover:-translate-y-[3px]"
                  onClick={() => playClick()}
                >
                  <SocialIcon type={s.type} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
