# Triển khai lên Vercel

## 1. Cơ sở dữ liệu PostgreSQL
Vercel không chạy PostgreSQL. Tạo một CSDL miễn phí, ví dụ Neon (neon.tech), rồi lấy chuỗi kết nối dạng `postgres://...?sslmode=require`.

Chạy migration một lần từ máy bạn:
```bash
DATABASE_URL="postgres://..." npm run db:migrate
DATABASE_URL="postgres://..." npm run db:seed
```

## 2. Biến môi trường trên Vercel
Vào Project → Settings → Environment Variables:

| Tên | Giá trị |
|---|---|
| `DATABASE_URL` | chuỗi kết nối Postgres ở bước 1 |
| `JWT_SECRET` | chuỗi ngẫu nhiên tối thiểu 32 ký tự (`openssl rand -hex 32`) |
| `CORS_ORIGIN` | URL của trang sau khi deploy, ví dụ `https://brain-arena.vercel.app` |
| `NODE_ENV` | `production` |

## 3. Deploy
Cách 1 (khuyến nghị): đẩy mã lên GitHub, rồi trên vercel.com chọn **Add New → Project** và import repo. Vercel đọc `vercel.json` tự động.

Cách 2: từ thư mục gốc dự án
```bash
npm i -g vercel
vercel login
vercel --prod
```

## 4. Kiểm tra sau khi deploy
- `https://<tên-miền>/api/health` phải trả về `{"ok":true}`.
- Mở trang chủ, thử đăng ký tài khoản và chơi một lượt.

## Lưu ý
- Trang tĩnh lấy từ `apps/web/dist`; mọi yêu cầu `/api/*` chạy qua `api/[...path].ts`.
- Giao diện React hiện lưu tiến trình trên trình duyệt. Đăng nhập gọi API thật, nhưng tiến trình chơi chưa đồng bộ lên CSDL.
