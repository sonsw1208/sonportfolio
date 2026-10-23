# Son Media Portfolio

Portfolio của video editor, dùng Next.js 15 App Router, React 19, TypeScript,
Tailwind CSS 3 và Framer Motion.

## Chạy local

```powershell
cd D:\Port\sonportfolio-main
npm ci
npm run dev -- --hostname 127.0.0.1
```

Nếu đã có `node_modules`, chỉ cần chạy lệnh `npm run dev` ở trên.

- Trang chủ: http://localhost:3000/
- Quản trị: http://localhost:3000/admin.html

Admin tự lưu sau khoảng 500 ms qua `/api/content`, cập nhật trực tiếp
`src/data/content.json`. Ảnh tải lên được lưu trong `public/uploads/` qua
`/api/upload`. Trang chủ tự cập nhật qua Fast Refresh.

Admin dùng toàn bộ chiều rộng, không nhúng preview trang chủ. Trong **Sản phẩm
(Video)**, chọn thể loại rồi kéo tay cầm **⠿** trên thumbnail hoặc dùng các nút
**Đầu / Trước / Sau**. Sắp xếp trong một thể loại giữ nguyên các vị trí của video
thuộc thể loại khác. **Hoàn tác sắp xếp** khôi phục các lần sắp xếp trong phiên
hiện tại (tối đa 30 lần, kể cả khi đã tự lưu); tải lại trang sẽ xóa lịch sử này.
Bấm **Chỉnh sửa** để mở form chi tiết video. Nút **Mở trang chủ** mở tab riêng.

Video chưa có thumbnail sẽ tự lấy ảnh do Google Drive tạo sẵn khi mở admin.
Ảnh được lưu vào `public/uploads/` qua `/api/thumbnail`, rồi admin tự lưu đường
dẫn vào nội dung. Ảnh đã chọn thủ công được giữ nguyên. Nếu Drive chưa xử lý xong
hoặc video chưa công khai, mở **Chỉnh sửa → Tự lấy ảnh từ video** để thử lại.
Khi dán link mới, rời ô nhập cũng sẽ lấy ảnh nếu video chưa có thumbnail.

## Cấu trúc

- `src/app/page.tsx`: ghép Navbar, Hero, Works, About, Contact và Footer.
- `src/data/content.json`: toàn bộ nội dung trang.
- `src/data/types.ts`: kiểu dữ liệu của nội dung.
- `src/components/`: giao diện, bộ lọc tác phẩm và modal video Google Drive.
- `src/context/`: chế độ sáng/tối, ngôn ngữ VI/EN và âm thanh tương tác.
- `src/lib/translate.ts`: dịch VI → EN bằng MyMemory, cache ở localStorage.
- `src/app/globals.css`: design tokens cho hai chế độ màu.
- `public/admin.html`: giao diện quản trị đang sử dụng.
- `public/admin-videos.js`: lưới video, bộ lọc, sắp xếp và form chỉnh sửa.
- `public/uploads/`: ảnh đang được nội dung trang tham chiếu; cần giữ khi deploy.

## Kiểm tra và build

```powershell
npm run lint
npm run build
npm run start
```

Ở production, middleware chặn trang admin và API quản trị. Để sửa nội dung,
chạy dev local, chỉnh trong admin rồi commit nội dung và ảnh trước khi deploy.

## Dọn thư mục ngày 23/10/2026

Bản web tĩnh cũ (`index.html`, `admin.html`, `server.js`, `site-data.js`),
ảnh xuất thử và các file After Effects/video đã chuyển ra ngoài dự án,
tại `D:\Port\archive-2026-10-23` để có thể khôi phục.
Đã bỏ các SVG mẫu Next.js và hook `useTranslate` không có nơi sử dụng.
Giữ ảnh tham khảo thiết kế ở thư mục gốc và toàn bộ 20 ảnh trong `public/uploads/`.
