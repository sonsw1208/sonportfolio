const GAP = 52; // px — khoảng cách giữa từ và dấu ✦, cũng là khoảng cách giữa các từ

export function Marquee({ items }: { items: string[] }) {
  if (!items.length) return null;

  // Animation scrollx dịch đúng -50%, nên track PHẢI gồm số bản sao CHẴN và nửa đầu track
  // phải rộng hơn màn hình rộng nhất — nếu không, lúc cuộn tới cuối sẽ lộ khoảng trắng.
  // Nhân bản tới ~32 item (nửa đầu ~16 item ≈ 4000px) là dư cho cả màn ultrawide.
  const need = Math.ceil(32 / items.length);
  const copies = Math.max(2, need + (need % 2)); // làm tròn lên số chẵn
  const track = Array.from({ length: copies }, () => items).flat();

  return (
    <div className="border-t border-b border-border bg-bg-soft overflow-hidden py-4 mt-[70px]">
      {/* Marquee chỉ là chữ trang trí lặp lại, không phải nội dung thao tác — giữ chuyển động
          kể cả khi bật prefers-reduced-motion (khác với Reveal fade-in, vốn vẫn tôn trọng
          cài đặt này vì đó là chuyển động khi thao tác/scroll). */}
      <div className="flex whitespace-nowrap w-max animate-scrollx">
        {track.map((word, i) => (
          // Khoảng cách nằm ở padding-right của từng item, KHÔNG dùng `gap` của flex:
          // flex-gap không sinh khoảng cách ở chỗ nối giữa bản sao cuối và bản sao đầu,
          // nên -50% sẽ lệch đúng một gap và mắt thấy chữ dính/giật mỗi vòng lặp.
          <span
            key={i}
            style={{ gap: GAP, paddingRight: GAP }}
            className="font-display font-semibold text-[1.05rem] text-text-soft flex items-center"
          >
            {word}
            <span className="text-g400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
