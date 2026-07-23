# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- Data video khai báo tập trung ở `src/data/works.ts` (interface `WorkItem` trong `src/data/types.ts`): mỗi item gồm `id`, `title`, `cat` (key lọc), `catLabel` (nhãn hiển thị), `dur`, `role`, `desc`, `driveFileId`, `thumb` (ảnh thật, ưu tiên nếu có), `hue` (gradient CSS dùng làm placeholder khi chưa có `thumb`).
- Component `<VideoEmbed>` nhận `driveFileId`, render iframe trong modal/lightbox với tỉ lệ 16:9 (`aspect-video`), lazy load — chỉ tải iframe khi user bấm play để trang nhẹ.
- Thumbnail: field `thumb`. **Thực tế hiện tại `thumb` đều rỗng** → mọi card dùng gradient `hue` làm placeholder (xem `Works.tsx`, render qua `background-image` inline chứ không qua `next/image`). Drive không cho lấy thumbnail chất lượng cao ổn định, nên khi có ảnh thật thì nạp qua admin (thành data URI, xem §12) hoặc đặt file vào `public/` rồi trỏ đường dẫn.
- Lưu ý giới hạn: Google Drive embed không hỗ trợ autoplay/điều khiển chất lượng tốt và có thể bị giới hạn lượt xem cao — chấp nhận đánh đổi này theo lựa chọn của user.

---

## 6. Cấu trúc thư mục (đã triển khai)

```
src/
  app/
    layout.tsx          # root layout: next/font, script chặn FOUC theme/lang, providers, metadata
    page.tsx             # trang chủ (Navbar + Hero + Works + About + Contact + Footer)
    globals.css          # CSS variables light/dark, @tailwind directives, keyframes marquee, reduced-motion
    api/
      content/route.ts    # GET/POST src/data/content.json — hậu trường cho public/admin.html (chỉ ghi được khi dev)
  components/
    ui/                  # Button, Pill, Logo, GradientText (Highlighted), Reveal/RevealStagger/RevealItem,
                          # Marquee, ThemeToggle, LangToggle, SoundToggle, SocialIcon
    Navbar.tsx, Hero.tsx, Works.tsx, VideoEmbed.tsx, About.tsx, Contact.tsx, Footer.tsx
  context/                # ThemeProvider, LangProvider, SoundProvider ("use client")
  hooks/                   # useSound.ts, useTranslate.ts
  data/
    types.ts               # interface dùng chung (SiteProfile, WorkItem, ...)
    content.json             # NGUỒN SỰ THẬT DUY NHẤT cho nội dung site — sửa qua /admin.html hoặc trực tiếp
    works.ts                  # re-export content.json.works, gán type WorksSection
    profile.ts                 # re-export phần còn lại của content.json, gán type SiteProfile
  lib/
    drive.ts                 # buildDriveEmbedUrl(fileId)
    translate.ts               # trText/trSeg (MyMemory API) + cache — auto-translate VI→EN
    uiStrings.ts                # chuỗi giao diện cố định VI/EN (empty, soon, sound, theme, lang)
    cn.ts                        # helper classnames (clsx + tailwind-merge)
public/
  admin.html                    # trang quản trị nội dung — xem mục 10
  thumbnails/                    # ảnh thumbnail video (chưa dùng, còn placeholder gradient `hue`)
tailwind.config.ts
```

`context/` và `hooks/` không nằm trong danh sách gốc nhưng là phần mở rộng cần thiết: mọi section
hiển thị nội dung (Hero/Works/About/Contact/Footer/Navbar) đọc dữ liệu qua `useLang()` — vì tính năng
auto-translate VI/EN chạy runtime (mục 10 cũ), các section này bắt buộc là Client Component (`"use client"`)
thay vì Server Component thuần, để phản ứng ngay khi người dùng đổi ngôn ngữ mà không reload trang.

---

## 7. Lệnh thường dùng

Repo đã port sang Next.js 15 (App Router), `package.json` ở gốc repo:

```bash
npm run dev      # chạy dev server (http://localhost:3000) — admin ở /admin.html
npm run build    # build production (cũng là bước type-check thật: tsc chạy trong build)
npm run start    # chạy bản build
npm run lint     # eslint flat config (eslint.config.mjs); script là `eslint` trần, không kèm path
```

**Không có test runner** trong repo (không jest/vitest/playwright trong `package.json`) — cổng chất lượng duy nhất là `npm run build` + `npm run lint`. Đừng bịa lệnh chạy test; nếu cần test thì hỏi user trước khi thêm framework.

`node server.js` (port 5500) là công cụ của bản static cũ, **đã lỗi thời — không dùng nữa**; admin hiện chạy trong chính Next dev server (xem mục 10).

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
   Đã triển khai trong `src/hooks/useSound.ts`: âm thanh được **tổng hợp trực tiếp bằng Web Audio oscillator** (2 tone sine 660Hz → 990Hz, gain ~0.05) — **không có file audio nào, `public/sounds/` không tồn tại**; đừng thêm file mp3/wav trừ khi user yêu cầu đổi hướng. Mọi phần tử tương tác (nút, pill, mở video, nav) gọi `playClick()`. `SoundProvider` giữ trạng thái bật/tắt (mặc định lấy từ `content.json → soundDefault`), `SoundToggle` là nút mute. Không tự phát âm thanh ngoài hành động click của user.

---

## 9. Quy ước làm việc

- **Design tokens tập trung**: mọi màu/gradient/spacing lấy từ Tailwind config, không hardcode.
- **Dữ liệu tách khỏi UI**: nội dung nằm trong `src/data/content.json` (sửa qua `/admin.html` hoặc chỉnh trực tiếp file JSON) — xem mục 10; không sửa component để đổi nội dung.
- **Component nhỏ, tái sử dụng**: tránh lặp; ưu tiên composition.
- **Nội dung tiếng Việt** cho phần user thấy (trừ khi user muốn song ngữ). Code/comment kỹ thuật giữ tiếng Anh.
- **Responsive & accessible** là bắt buộc, không phải tùy chọn.
- Trước khi coi một việc là "xong": chạy `npm run build` và `npm run lint` để chắc chắn không lỗi.
- Giữ phong cách tối giản — khi phân vân giữa "thêm hiệu ứng" và "để sạch", chọn sạch.

---

## 10. Admin chỉnh nội dung — GHI TRỰC TIẾP vào code, tự động lên trang chủ

`src/data/content.json` là **nguồn sự thật duy nhất** cho toàn bộ nội dung site (brand, hero, stats, marquee, works, about, contact, footer, soundDefault). `src/data/profile.ts` và `src/data/works.ts` chỉ import và gán type từ file này — không còn giá trị hardcode trong 2 file đó.

- **`public/admin.html`** — trang quản trị, Next.js tự serve tại `http://localhost:3000/admin.html` khi chạy `npm run dev` (không cần `node server.js`/port 5500 nữa). Form giống bản cũ (repeater, image field tự nén qua canvas...), nhưng khi sửa field (`apply()`), sau debounce ~500ms sẽ **POST thẳng vào `/api/content`**, route này ghi đè `src/data/content.json` trên đĩa. Khung preview bên phải trỏ thẳng vào trang chủ thật (`/`, không phải bản clone tĩnh) nên luôn khớp 100% với những gì sẽ hiển thị.
- **`src/app/api/content/route.ts`** — `GET` đọc, `POST` ghi `src/data/content.json`. **POST bị chặn khi `NODE_ENV=production`** (trả 403) vì filesystem trên môi trường serverless (Vercel) chỉ đọc — tính năng sửa-trực-tiếp này CHỈ chạy khi `npm run dev` cục bộ. Sửa nội dung xong thì commit + deploy lại như bình thường.
- **Vì sao "tự động lên trang chủ"**: `profile.ts`/`works.ts` `import` tĩnh từ `content.json`, nên khi file này đổi trên đĩa, Next dev server (Fast Refresh/webpack watcher) tự biên dịch lại và đẩy cập nhật tới **mọi tab đang mở** trỏ vào cùng `npm run dev` (kể cả tab trang chủ đang mở riêng, không chỉ iframe trong admin) — không cần bước merge thủ công nào nữa. Đã kiểm chứng: sửa field ở `/admin.html` → `content.json` đổi ngay → tab trang chủ riêng biệt tự cập nhật sau khi Next hot-reload xong (thường dưới 1–2 giây; nếu chưa thấy, F5 lại tab đó).
- Nút **"Tải backup JSON"** trong admin chỉ còn là bản sao lưu thủ công (không phải cơ chế lưu chính), và **"Nhập file"** để phục hồi từ backup đó.
- **Đã lỗi thời, không dùng nữa**: `index.html`, `admin.html` (bản ở root, khác với `public/admin.html`), `site-data.js`, `server.js` ở root repo — đây là bản static gốc trước khi port, giữ lại chỉ để tham khảo lịch sử. KHÔNG sửa các file này để cập nhật nội dung site thật; chúng không còn liên kết gì với `src/`.

Screenshot khi review (mandatory rule #1): dùng skill `run` (Playwright/`chromium-cli`) để chụp `http://localhost:3000/?shot=1` (bật `static-mode`, tắt scroll-reveal) ở các độ rộng desktop (~1440px) và mobile (~390px) rồi so với ảnh tham khảo.

## 11. Ghi chú

- Ảnh tham khảo bố cục: `🎨 Creative Graphic Design Portfolio 2026 by @xy_inun_.jpg` (ở thư mục gốc).
- Bảng màu bản gốc là tối + gold — **KHÔNG dùng**; dự án này là **trắng + xanh lá + gradient**.
- Khi cần nội dung thật (video, ảnh, tiểu sử), hỏi user thay vì bịa; dùng placeholder rõ ràng nếu chưa có.
- **Dark mode**: có giữ (quyết định của user khi port Next.js) — toggle qua `ThemeProvider`, thuộc tính `data-theme` trên `<html>`, không nằm trong bảng màu mục 3 (bảng màu mục 3 là chế độ sáng mặc định).
- **VI/EN auto-translate**: có giữ (quyết định của user) — dịch runtime qua MyMemory API (`src/lib/translate.ts`), cache trong `localStorage`, không phải bản dịch tĩnh/next-intl. Vì vậy các section hiển thị nội dung (Hero/Works/About/Contact/Footer) là Client Component (đọc `useLang()`), không phải Server Component thuần — xem ghi chú ở mục 6.
- Tailwind dùng **v3.4.x** (không phải v4) để khớp yêu cầu `tailwind.config.ts` ở mục 3 — nếu nâng cấp Next.js/Tailwind sau này, cân nhắc kỹ trước khi đổi sang v4 vì sẽ đổi cách khai báo token.

---

## 12. Bất biến kiến trúc (đọc trước khi sửa code)

Những điều dưới đây chỉ lộ ra khi đọc nhiều file cùng lúc — nắm trước để khỏi phá ngầm:

**Token màu chỉ có MỘT nơi khai báo giá trị**: `globals.css` `:root` (light) + `:root[data-theme="dark"]` (dark). `tailwind.config.ts` **không chứa hex nào** — nó chỉ map `bg`, `text`, `g500`, `shadow-md`, `rounded-lg`… sang `var(--…)`. Muốn đổi màu/bo góc/shadow → sửa CSS variable, không sửa Tailwind config. Hệ quả: mọi utility màu tự động đúng ở cả 2 theme; **hardcode `bg-emerald-500` hay hex inline sẽ vỡ dark mode.**

**Thêm field nội dung mới = sửa 3 nơi, không phải 1**:
1. `src/data/types.ts` — thêm vào interface (nếu không, `profile.ts`/`works.ts` gán `content.json` vào type sẽ lỗi lúc `npm run build`).
2. `src/data/content.json` — giá trị thật (hoặc thêm qua `/admin.html`, nhưng form trong `public/admin.html` cũng phải có control tương ứng thì admin mới sửa được).
3. `src/lib/translate.ts` — **đăng ký field vào `translateProfile`/`translateWorks`**, nếu không thì bật EN field đó vẫn hiện tiếng Việt. Danh sách field cần dịch là các mảng literal hardcode trong 2 hàm này.

**Auto-translate chỉ chạm chuỗi có dấu tiếng Việt**: `trSeg()` bỏ qua mọi đoạn không khớp regex `viMarks`. Vì vậy `"Premiere Pro"`, `"Motion"`, tên riêng, tên danh mục thuần ASCII sẽ **giữ nguyên ở cả 2 ngôn ngữ** — đó là hành vi cố ý, không phải bug. Chuỗi giao diện cố định (không đến từ `content.json`) thì không dịch runtime mà tra bảng `src/lib/uiStrings.ts` qua `t(lang, key)`.

**Ảnh trong `content.json` là data URI base64 inline**, không phải file trong `public/`: `brand.logoImage`, `hero.portraitImage`, `about.photo` hiện mỗi cái ~90–160 KB chuỗi base64 (admin nén bằng canvas trước khi nhúng). Hệ quả cần nhớ: (a) `content.json` rất lớn — đừng in cả file ra, đọc bằng script trích field; (b) `next/image` nhận data URI không qua optimizer, nên đừng thêm `remotePatterns`/domain vào `next.config.ts` cho mấy ảnh này; (c) diff của một lần đổi ảnh sẽ khổng lồ, là bình thường.

**Reveal có 3 chế độ, đừng thay bằng `useReducedMotion()` của framer**: `src/components/ui/Reveal.tsx` cố ý render lần đầu trên client GIỐNG HỆT SSR (`disabled=false`) rồi mới đồng bộ `matchMedia` trong `useLayoutEffect` — dùng `useReducedMotion()` sẽ đọc matchMedia ngay lúc render đầu và gây lệch hydration. Chế độ thứ ba là `?shot=1` → script trong `layout.tsx` gắn class `static-mode` lên `<html>` → tắt reveal để chụp screenshot tĩnh (mục 10).

**Danh sách động bọc trong `RevealStagger` phải có `key` đổi theo bộ lọc**: `RevealStagger` dùng `whileInView` + `viewport={{ once: true }}`, nên sau khi cụm đã hiện xong, mọi `RevealItem` mount thêm về sau **không nhận được variant `show`** và kẹt vĩnh viễn ở `opacity: 0` — nhìn như dữ liệu biến mất. `Works.tsx` xử lý bằng `<RevealStagger key={filter}>` để remount cả cụm mỗi lần đổi filter. Thêm bất kỳ lưới lọc/phân trang nào khác cũng phải làm vậy.

**Trạng thái toàn cục nằm ở 3 provider lồng nhau** (`layout.tsx`: Theme → Lang → Sound). `LangProvider` không chỉ giữ ngôn ngữ mà **còn là nơi phát nội dung**: nó trả về `profile`/`works` đã dịch (hoặc bản VI gốc) qua `useLang()`. Vì thế **mọi section hiển thị nội dung đều `"use client"`** — đây là đánh đổi có chủ ý với nguyên tắc "ưu tiên Server Component" ở mục 2, đừng "sửa" bằng cách chuyển chúng về server.

**Favicon phải nằm ở `public/`, KHÔNG được để trong `src/app/`**: đường dẫn tuyệt đối của repo chứa dấu nháy đơn (`...\Note's Son\...`). File icon đặt trong `src/app/` sẽ đi qua `next-metadata-route-loader`, loader này nội suy đường dẫn vào một chuỗi single-quoted mà không escape → `Module parse failed: Unexpected token`, hỏng cả `/favicon.ico` lẫn `/_not-found`. Cách dùng đúng: `public/favicon.ico` + khai báo `icons: { icon: "/favicon.ico" }` trong `metadata` ở `layout.tsx`. Cùng lý do, đừng thêm `icon.*`/`apple-icon.*`/`opengraph-image.*` vào `src/app/`.

**Chống FOUC bằng script chặn ở `<head>`**: đoạn `THEME_INIT` trong `layout.tsx` chạy trước hydration để set `data-theme`/`data-lang` từ `localStorage`. `<html>` có `suppressHydrationWarning` chính vì lý do này. Đổi cách lưu theme/lang thì phải sửa đồng thời script này và provider tương ứng.
