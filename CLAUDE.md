# CLAUDE.md

Portfolio website cá nhân cho một **Video Editor** chuyên nghiệp. Đây là tài liệu hướng dẫn cho Claude Code khi làm việc trong dự án này.

---

## 1. Mục tiêu dự án

Một trang portfolio tối giản, hiện đại, chuyên nghiệp giới thiệu năng lực của một video editor. Website có **hai mục chính**:

1. **Works / Portfolio** — nơi trưng bày các sản phẩm video (dự án editing, showreel, reel...). Video được nhúng từ **Google Drive**.
2. **About** — giới thiệu bản thân: câu chuyện, kỹ năng, phần mềm sử dụng, kinh nghiệm, thông tin liên hệ.

Cảm hứng thiết kế lấy từ ảnh tham khảo `🎨 Creative Graphic Design Portfolio 2026 by @xy_inun_.jpg` trong repo — **giữ lại bố cục/cấu trúc** của bản gốc (hero lớn với ảnh chân dung, typography đậm nhiều trọng lượng, thẻ bo góc lớn, gallery dạng lưới, pills phân loại, carousel có mũi tên), nhưng **đổi hoàn toàn bảng màu** từ nền tối + gold sang **trắng + xanh lá + gradient hiện đại**.

> Quan trọng: Tham khảo ảnh để lấy **layout, nhịp điệu, hệ phân cấp thị giác** — KHÔNG sao chép màu tối/gold của bản gốc.

---

## 2. Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS** (utility-first, cấu hình design tokens ở `tailwind.config.ts`)
- **Framer Motion** cho animation (scroll reveal, hover, page transition mượt)
- **lucide-react** cho icon
- Font: **Google Fonts** qua `next/font` (xem mục Design System)
- Deploy: **Vercel**

Nguyên tắc: ưu tiên Server Components; chỉ thêm `"use client"` khi cần state/animation/tương tác.

---

## 3. Design System

Toàn bộ design token phải khai báo tập trung ở `tailwind.config.ts` và CSS variables trong `globals.css`. **Không hardcode màu hex rải rác trong component.**

### Bảng màu (tông trắng + xanh lá)

```
Background chính:   #FFFFFF  (white)
Background phụ:     #F6F9F7  (mint-white, cho section xen kẽ)
Surface / card:     #FFFFFF với border #E8F0EB, shadow mềm
Text chính:         #0B1F16  (deep forest, gần đen)
Text phụ:           #5B6B62  (slate green-gray)

Green 300:          #6EE7B7
Green 400:          #34D399
Green 500:          #10B981  (primary — nút, link, accent)
Green 600:          #059669  (hover/nhấn)
Green 700:          #047857
Green 900:          #064E3B  (nền xanh đậm cho block tương phản)
```

### Gradient (điểm nhấn "chất video editor")

Gradient là linh hồn của thiết kế — dùng cho hero, tiêu đề lớn, nút CTA, viền card nổi bật.

```
--gradient-primary:  linear-gradient(135deg, #059669 0%, #10B981 45%, #6EE7B7 100%)
--gradient-mesh:     radial-gradient tổ hợp emerald/teal/mint làm nền hero (soft, mờ)
--gradient-text:     linear-gradient(120deg, #047857, #10B981, #34D399)  (dùng bg-clip-text)
--gradient-accent:   linear-gradient(135deg, #10B981, #14B8A6)  (green → teal)
```

- Tiêu đề hero dùng gradient text (`bg-clip-text text-transparent`).
- Nút CTA chính: nền gradient-primary, chữ trắng, bo tròn `rounded-full`, shadow xanh mờ.
- Tránh lạm dụng: nền tổng thể luôn là trắng/mint-white sạch sẽ; gradient chỉ dùng làm điểm nhấn.

### Typography

- Heading: font sans hiện đại, đậm (khuyên dùng **Clash Display** hoặc **Space Grotesk**), size lớn, tracking hơi âm.
- Body: **Inter** hoặc **Geist Sans**, dễ đọc.
- Nhịp điệu: kết hợp chữ rất to (hero) với label nhỏ viết hoa, letter-spacing rộng (giống bản tham khảo).

### Nguyên tắc thị giác

- **Tối giản**: nhiều khoảng trắng, ít nhưng chất, phân cấp rõ ràng.
- Bo góc lớn: card `rounded-2xl`/`rounded-3xl`.
- Shadow mềm, tông xanh nhạt thay vì đen (`shadow-emerald-500/10`).
- Pills phân loại thể loại video (VD: `Cinematic`, `Reel`, `Commercial`, `Wedding`, `Motion`) — pill active dùng gradient.
- Responsive mobile-first; layout đẹp trên cả điện thoại và desktop.
- Micro-interactions tinh tế: hover card nâng nhẹ + đổi shadow, scroll reveal fade-up.
- Ưu tiên accessibility: contrast đạt WCAG AA, focus ring rõ, `prefers-reduced-motion` được tôn trọng.

---

## 4. Cấu trúc trang (adapt từ ảnh tham khảo)

Nav: `HOME` · `WORKS` · `ABOUT` · `CONTACT`

1. **Hero** — headline gradient lớn (VD "Video Editor & Storyteller"), sub-text ngắn, nút CTA "Xem sản phẩm ↓" / "Liên hệ". Nền gradient-mesh mờ + ảnh/showreel chân dung.
2. **Works / Portfolio** (mục chính 1) — lưới các project video (thumbnail bo góc, hover play), pills lọc theo thể loại, mở video qua **lightbox/modal nhúng Google Drive**. Có thể có carousel "featured".
3. **About** (mục chính 2) — giới thiệu bản thân, danh sách kỹ năng & phần mềm (Premiere Pro, After Effects, DaVinci Resolve...), thống kê (số năm kinh nghiệm, số dự án).
4. **Contact / Footer** — email (`vgtglobaltradingjsc@gmail.com` là email tài khoản, hỏi user về email liên hệ công khai muốn hiển thị), link mạng xã hội.

---

## 5. Nhúng video từ Google Drive

Video host trên Google Drive, nhúng bằng iframe với URL `/preview`:

```
https://drive.google.com/file/d/<FILE_ID>/preview
```

- File Drive phải đặt quyền chia sẻ **"Anyone with the link"** thì mới nhúng được.
- Data video khai báo tập trung trong một file (VD `src/data/works.ts`): mỗi item gồm `id`, `title`, `category`, `driveFileId`, `thumbnail`, `description`, `role`.
- Component `<VideoEmbed>` nhận `driveFileId`, render iframe trong modal/lightbox với tỉ lệ 16:9 (`aspect-video`), lazy load — chỉ tải iframe khi user bấm play để trang nhẹ.
- Thumbnail: dùng ảnh riêng đặt trong `public/thumbnails/` (Drive không cho lấy thumbnail chất lượng cao ổn định). Tối ưu bằng `next/image`.
- Lưu ý giới hạn: Google Drive embed không hỗ trợ autoplay/điều khiển chất lượng tốt và có thể bị giới hạn lượt xem cao — chấp nhận đánh đổi này theo lựa chọn của user.

---

## 6. Cấu trúc thư mục

```
src/
  app/
    layout.tsx          # root layout, font, metadata
    page.tsx            # trang chủ (hero + works + about + contact)
    globals.css         # CSS variables, base styles
  components/
    ui/                 # component tái sử dụng (Button, Pill, Card, Section...)
    Hero.tsx
    Works.tsx
    VideoEmbed.tsx      # modal nhúng Google Drive
    About.tsx
    Contact.tsx
    Navbar.tsx
    Footer.tsx
  data/
    works.ts            # dữ liệu video (nguồn sự thật duy nhất)
    profile.ts          # thông tin About
  lib/                  # helper (VD build Drive URL)
public/
  thumbnails/           # ảnh thumbnail video
tailwind.config.ts
```

---

## 7. Lệnh thường dùng

```bash
npm run dev      # chạy dev server (http://localhost:3000)
npm run build    # build production
npm run start    # chạy bản build
npm run lint     # kiểm tra lint
```

Môi trường: Windows, shell mặc định là **PowerShell**. Dùng cú pháp PowerShell khi chạy lệnh (VD biến `$env:VAR`, không dùng `&&` để nối lệnh — tách riêng).

---

## 8. Quy tắc BẮT BUỘC (non-negotiable)

Những quy tắc dưới đây phải được tuân thủ trong mọi thay đổi:

1. **Screenshot & so sánh với design gốc sau mỗi thay đổi lớn.**
   Sau khi hoàn thành một section/thay đổi UI đáng kể, chạy dev server, chụp screenshot (dùng skill `run` hoặc trình duyệt tự động), rồi **so sánh trực tiếp với ảnh tham khảo** `🎨 Creative Graphic Design Portfolio 2026 by @xy_inun_.jpg` về bố cục, phân cấp thị giác, tỉ lệ. Ghi nhận khác biệt và chỉnh cho khớp (nhớ: layout khớp, màu vẫn là trắng + xanh lá). Chưa so sánh thì chưa coi là xong.

2. **Mobile-friendly là bắt buộc.**
   Mọi section phải responsive, đẹp và dùng được trên điện thoại. Thiết kế mobile-first, kiểm tra ở breakpoint nhỏ (≤ 640px) trước khi coi là hoàn thành. Không có tràn ngang, chữ không vỡ, nút đủ lớn để chạm.

3. **Mỗi section có animation khi scroll.**
   Dùng Framer Motion (VD `whileInView` + `viewport={{ once: true }}`): fade-up, stagger cho danh sách card. Tinh tế, mượt, không lòe loẹt. Luôn tôn trọng `prefers-reduced-motion` (tắt animation nếu user yêu cầu giảm chuyển động).

4. **Sound effect tinh tế khi tương tác click.**
   Thêm âm thanh nhẹ, tinh tế khi user click các phần tử tương tác (nút, pill, mở video, nav). Tạo hook `useSound` dùng Web Audio API/thẻ audio, âm lượng thấp, file ngắn (đặt trong `public/sounds/`). **Phải có nút bật/tắt âm thanh** (mute toggle) và mặc định tôn trọng lựa chọn user; không tự phát âm thanh ngoài hành động click của user.

---

## 9. Quy ước làm việc

- **Design tokens tập trung**: mọi màu/gradient/spacing lấy từ Tailwind config, không hardcode.
- **Dữ liệu tách khỏi UI**: thêm/sửa video chỉ động vào `src/data/works.ts`, không sửa component.
- **Component nhỏ, tái sử dụng**: tránh lặp; ưu tiên composition.
- **Nội dung tiếng Việt** cho phần user thấy (trừ khi user muốn song ngữ). Code/comment kỹ thuật giữ tiếng Anh.
- **Responsive & accessible** là bắt buộc, không phải tùy chọn.
- Trước khi coi một việc là "xong": chạy `npm run build` và `npm run lint` để chắc chắn không lỗi.
- Giữ phong cách tối giản — khi phân vân giữa "thêm hiệu ứng" và "để sạch", chọn sạch.

---

## 10. Bản dựng hiện tại (static + admin)

Trước khi port sang Next.js, dự án đang chạy bản **static self-contained**, gồm 3 file:

- **site-data.js** — "database" nội dung: `window.SITE_DATA = {...}` (logo, hero/banner, ảnh, video Google Drive, about, contact...). Ảnh lưu dạng data URI base64 hoặc URL. Đây là nguồn sự thật, có thể sửa tay hoặc qua admin.
- **index.html** — data-driven: đọc `site-data.js` (ưu tiên `localStorage['studioSiteData_v1']` nếu có) rồi render toàn bộ. Lắng nghe `postMessage {type:'SITE_DATA'}` để preview trực tiếp. Có `?shot=1` = static-mode (hiện toàn bộ, bỏ scroll reveal) phục vụ screenshot.
- **admin.html** — trang quản trị: form + iframe preview trực tiếp (đẩy dữ liệu qua postMessage, không cần server). Upload ảnh tự nén bằng canvas. Nút **Tải site-data.js** xuất file mới để thay thế → lưu vĩnh viễn, chạy trên cả `file://` lẫn hosting. Có Nhập file / Khôi phục gốc / Lưu tạm (localStorage).

Quy trình sửa nội dung: mở admin.html → chỉnh → xem preview → **Tải site-data.js** → thay file cùng tên. Khi port Next.js, chuyển `SITE_DATA` thành data/CMS và giữ nguyên cấu trúc nội dung.

Screenshot khi review (mandatory rule #1): headless thường bỏ qua `--window-size` cho layout → dùng script CDP `Emulation.setDeviceMetricsOverride` (trong scratchpad `shot.js`, `shot_region.js`) để emulate desktop/mobile đúng chuẩn.

## 11. Ghi chú

- Ảnh tham khảo bố cục: `🎨 Creative Graphic Design Portfolio 2026 by @xy_inun_.jpg` (ở thư mục gốc).
- Bảng màu bản gốc là tối + gold — **KHÔNG dùng**; dự án này là **trắng + xanh lá + gradient**.
- Khi cần nội dung thật (video, ảnh, tiểu sử), hỏi user thay vì bịa; dùng placeholder rõ ràng nếu chưa có.
