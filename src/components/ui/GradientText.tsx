import type { ReactNode } from "react";

/** Bọc đoạn con `highlight` (nếu tìm thấy trong `text`) bằng gradient text. */
export function Highlighted({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}): ReactNode {
  if (!highlight) return text;
  const i = text.indexOf(highlight);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="grad-text">{highlight}</span>
      {text.slice(i + highlight.length)}
    </>
  );
}
