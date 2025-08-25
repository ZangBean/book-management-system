# 📚 Book Management App

Ứng dụng quản lý sách được viết bằng **React + Redux Toolkit + Redux Persist**.  
Cho phép người dùng **xem danh sách sách, tìm kiếm, lọc, sắp xếp, thêm/sửa sách** và hiển thị bằng **Swiper Carousel**.

---

## 🚀 Công nghệ sử dụng

- [React](https://react.dev/) – thư viện frontend chính
- [Redux Toolkit](https://redux-toolkit.js.org/) – quản lý state toàn cục
- [Redux Persist](https://github.com/rt2zz/redux-persist) – lưu state vào localStorage
- [Swiper.js](https://swiperjs.com/react) – carousel hiển thị featured books
- [React Router DOM](https://reactrouter.com/) – điều hướng trang
- [React Icons](https://react-icons.github.io/react-icons/) – icon UI
- [JSON Server](https://github.com/typicode/json-server) – fake API cho backend

---

## ⚡ Chức năng chính

- Hiển thị **sách nổi bật** bằng Swiper Carousel (auto slide, responsive).
- Trang **BookPage**:
  - Lọc sách theo `rate`
  - Sắp xếp sách theo `views`
  - Phân trang (pagination có ... dots)
- Modal thêm/sửa sách:
  - Điền thông tin sách (`name, author, genre, price, ...`)
  - Dropdown chọn `genre` (có validate)
- Redux + Persist:
  - Lưu trữ state sách vào localStorage
  - Khi reload (F5) không bị mất dữ liệu
- Kết nối API để quản lý dữ liệu.

---

## 🔧 Cách chạy dự án

### 1. Clone repo

```bash
git clone https://github.com/ZangBean/book-management-system

cd book-management-system

npm install

npm run dev
```

