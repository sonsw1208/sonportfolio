/* Server tĩnh cục bộ để chạy website qua http://localhost (giúp nhúng video Google Drive).
   Chạy:  node server.js     rồi mở  http://localhost:5500  */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5500;
const ROOT = __dirname;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm'
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(ROOT, urlPath);
  // chặn truy cập ra ngoài thư mục
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); return res.end('404 - Không tìm thấy: ' + urlPath); }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {'Content-Type': TYPES[ext] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(PORT, () => {
  console.log('Server chạy tại: http://localhost:' + PORT);
  console.log('Trang chủ:  http://localhost:' + PORT + '/index.html');
  console.log('Trang admin: http://localhost:' + PORT + '/admin.html');
  console.log('Nhấn Ctrl+C để dừng.');
});
