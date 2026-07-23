"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "@/context/LangProvider";
import { useSound } from "@/hooks/useSound";
import { buildDriveEmbedUrl } from "@/lib/drive";
import { t } from "@/lib/uiStrings";

// Kiểu tối giản, đủ dùng chung cho work-item (Works) lẫn showreel (Hero) — mọi object
// nào có các field này (VD WorkItem) đều gán được vào prop `work` nhờ structural typing.
export interface VideoEmbedItem {
  title: string;
  driveFileId: string;
  catLabel?: string;
  role?: string;
}

export function VideoEmbed({ work, onClose }: { work: VideoEmbedItem | null; onClose: () => void }) {
  const { lang } = useLang();
  const { playClick } = useSound();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const open = work !== null;

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [open, onClose]);

  const handleClose = () => {
    playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && work && (
        <motion.div
          className="fixed inset-0 z-[200] flex p-6 overflow-y-auto bg-[rgba(6,78,59,.55)] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <div className="m-auto w-full max-w-[min(960px,calc((100vh-120px)*16/9))] bg-black rounded-md overflow-hidden shadow-lg relative">
            <button
              ref={closeBtnRef}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 border-none cursor-pointer grid place-items-center text-text shadow-[0_4px_14px_rgba(0,0,0,.35)] z-[5] transition-transform hover:scale-110"
              aria-label="Đóng"
              onClick={handleClose}
            >
              <X size={20} />
            </button>

            <div className="aspect-video w-full">
              {work.driveFileId ? (
                <iframe
                  src={buildDriveEmbedUrl(work.driveFileId)}
                  className="w-full h-full border-0 block"
                  allow="autoplay"
                  allowFullScreen
                />
              ) : (
                <div className="h-full grid place-items-center bg-[linear-gradient(160deg,#064e3b,#0b3b2e)] text-[#d1fae5] text-center px-6">
                  <div>
                    <div className="text-4xl opacity-90">🎬</div>
                    <p className="mt-3.5 text-base font-semibold">{t(lang, "soon")}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 px-5 bg-surface flex justify-between items-center gap-3.5 flex-wrap">
              <h3 id="video-modal-title" className="text-[1.1rem] font-semibold">
                {work.title}
              </h3>
              <span className="text-[0.82rem] text-text-soft">
                {[work.catLabel, work.role].filter(Boolean).join(" · ")}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
