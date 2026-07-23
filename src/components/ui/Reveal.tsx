"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

// useLayoutEffect trên server sẽ cảnh báo "does nothing on the server" — dùng useEffect khi SSR.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Không dùng framer-motion's useReducedMotion(): nó đọc matchMedia ngay trong lần render
// đầu tiên trên client (khác SSR luôn giả định false) → lệch hydration. Ở đây, lần render đầu
// trên client LUÔN khớp SSR (disabled=false, có animation), rồi mới đồng bộ giá trị thật bằng
// useLayoutEffect (chạy trước khi browser paint) để không bị nháy nội dung.
function useRevealDisabled() {
  const [disabled, setDisabled] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setDisabled(mq.matches || document.documentElement.classList.contains("static-mode"));
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return disabled;
}

interface RevealProps {
  children: ReactNode;
  delay?: number; // giây — d1=.08 d2=.16 d3=.24 d4=.32 (bản gốc)
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const disabled = useRevealDisabled();

  if (disabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={VARIANTS}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  staggerDelay = 0.08,
  className,
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const disabled = useRevealDisabled();

  if (disabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const disabled = useRevealDisabled();
  if (disabled) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={VARIANTS} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}
