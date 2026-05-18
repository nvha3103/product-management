# Thiết kế giao diện Authentication

## 1. Trang Đăng nhập (Login)

**File:** `views/admin/pages/auth/login.pug`

**Layout:** `views/admin/layouts/auth.pug` (không có sidebar/header)

**CSS:** `public/admin/css/auth.css`

### Giao diện:
- Background gradient: `#667eea` → `#764ba2`
- Container trắng, rounded corners, shadow
- Form gồm:
  - Tiêu đề: "Đăng nhập hệ thống"
  - Input Email (required, type email)
  - Input Password (required, type password)
  - Button "Đăng nhập" (màu gradient, full width)
  - Link "Đăng ký ngay" ở footer

### Luồng xử lý:
1. GET `/admin/auth/login` → hiển thị form
2. POST `/admin/auth/login` → validate → kiểm tra email/password (MD5 hash) → tạo token → lưu cookie → redirect dashboard
3. Nếu có token cookie → redirect dashboard ngay

### Validation:
- Email: bắt buộc, đúng format
- Password: bắt buộc

### Flash messages:
- Hiển thị error/success từ server

---

## 2. Trang Đăng ký (Register)

**File:** `views/admin/pages/auth/register.pug`

**Layout:** cùng auth.pug

### Giao diện:
- Tương tự login nhưng có thêm:
  - Input Họ tên (required)
  - Input Mật khẩu (minlength 6)
  - Input Xác nhận mật khẩu (phải khớp)

### Luồng xử lý:
1. GET `/admin/auth/register` → hiển thị form
2. POST `/admin/auth/register` → validate → kiểm tra email tồn tại → tạo account với role mặc định → redirect login với thông báo success

### Validation:
- fullName: bắt buộc, min 2 ký tự
- email: bắt buộc, đúng format, unique
- password: bắt buộc, min 6 ký tự
- confirmPassword: bắt buộc, khớp với password

### Role mặc định:
- `role_id = "67f1b4f3e1b2c8a9d0e1f2a3"` (cần thiết lập trong DB)

---

## 3. Đăng xuất (Logout)

**Route:** GET `/admin/auth/logout`

**Xử lý:** Xóa cookie token → redirect login

---

## 4. Middleware xác thực

**File:** `middlewares/admin/auth.middleware.js`

**Logic:**
- Kiểm tra cookie `token`
- Tìm user có token trong DB
- Nếu không có → redirect login
- Nếu có → cho phép truy cập

---

## 5. Security Notes
- **Password được hash bằng bcryptjs** (salt rounds = 10) - an toàn hơn MD5
- Token lưu trong cookie httpOnly
- Session chưa dùng đến (có thể optimize)
- Flash messages qua connect-flash
- Đã chuyển từ md5 → bcryptjs để tăng bảo mật

---

## 6. Routes cần thêm vào admin route
```javascript
router.get("/register", controller.register);
router.post("/register", validate.registerPost, controller.registerPost);
```
