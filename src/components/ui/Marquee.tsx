export function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items]; // lặp đôi để cuộn liền mạch

  return (
    <div className="border-t border-b border-border bg-bg-soft overflow-hidden py-4 mt-[70px]">
      {/* Marquee chỉ là chữ trang trí lặp lại, không phải nội dung thao tác — giữ chuyển động
          kể cả khi bật prefers-reduced-motion (khác với Reveal fade-in, vốn vẫn tôn trọng
          cài đặt này vì đó là chuyển động khi thao tác/scroll). */}
      <div className="flex gap-[52px] whitespace-nowrap w-max animate-scrollx">
        {track.map((word, i) => (
          <span
            key={i}
            className="font-display font-semibold text-[1.05rem] text-text-soft flex items-center gap-[52px]"
          >
            {word}
            <span className="text-g400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
