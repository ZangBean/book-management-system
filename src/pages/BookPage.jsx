import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import BookRandom from "../componets/BookRandom";
import {
  FaBook,
  FaBookAtlas,
  FaArrowUp91,
  FaArrowDown19,
  FaEye,
  FaDollarSign,
} from "react-icons/fa6";
import "../styles/BookPage.css";

const BookPage = ({ books, filtereds }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRate, setSelectedRate] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Cập nhật itemsPerPage dựa trên kích thước màn hình
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 1024) {
        setItemsPerPage(6); // Mobile
      } else if (window.innerWidth <= 1200) {
        setItemsPerPage(8); // Tablet
      } else {
        setItemsPerPage(10); // Desktop
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Reset page khi books thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [books, filtereds, selectedRate, sortOrder, itemsPerPage]);

  // Lọc theo rate
  const filteredByRate =
    selectedRate === "all"
      ? books
      : books.filter((b) => Math.floor(b.rate) === parseInt(selectedRate));
  // Sắp xếp theo view
  const sortedBooks = [...filteredByRate].sort((a, b) => {
    return sortOrder === "asc" ? a.view - b.view : b.view - a.view;
  });
  // Tổng số trang
  const totalPages = Math.ceil(filteredByRate.length / itemsPerPage);

  // Tính start và end index
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = sortedBooks.slice(startIndex, endIndex);

  // Tạo mảng nút phân trang giới hạn
  const maxPageButtons = 5; // Số nút tối đa hiển thị
  const getPaginationButtons = () => {
    const buttons = [];
    const half = Math.floor(maxPageButtons / 2);
    let startPage = Math.max(1, currentPage - half);
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // Điều chỉnh startPage nếu endPage gần cuối
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    // Thêm nút trang
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    // Thêm dấu chấm lửng nếu cần
    const showLeftDots = startPage > 1;
    const showRightDots = endPage < totalPages;

    return { buttons, showLeftDots, showRightDots };
  };

  const { buttons, showLeftDots, showRightDots } = getPaginationButtons();

  return (
    <div className="book-page container">
      <div className="page-title">
        <div className="title-box">
          <FaBook />
          <h1>Featured Books</h1>
        </div>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
          1600: { slidesPerView: 4 },
        }}
        className="book-slider"
      >
        {filtereds.slice(1, 6).map((book) => (
          <SwiperSlide
            key={book.id}
            onClick={() => navigate(`/book/${book.id}`)}
          >
            <div className="book-card">
              <img src={book.avatar} alt={book.name} className="book-img" />
              <h2 className="book-title">{book.name}</h2>
              <p className="book-author">{book.author}</p>
              <p className="book-genre">{book.genre}</p>
              <p className="book-price">${book.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="list-header">
        <div className="page-title">
          <div className="title-box">
            <FaBookAtlas />
            <h1>List of Books</h1>
          </div>
          <div className="filter-container">
            <div className="filter-group">
              <label htmlFor="sort-order" className="filter-label">
                Sort by views:
              </label>
              <button
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                className="filter-button"
              >
                {sortOrder === "asc" ? (
                  <FaArrowUp91 />
                ) : (
                  <FaArrowDown19 className="rotate" />
                )}
              </button>
            </div>

            <div className="filter-group">
              <label htmlFor="rate-filter" className="filter-label">
                Filter:
              </label>
              <select
                id="rate-filter"
                value={selectedRate}
                onChange={(e) => setSelectedRate(e.target.value)}
                className="filter-select"
              >
                <option value="all">All</option>
                <option value="1">Very Bad</option>
                <option value="2">Bad</option>
                <option value="3">Normal</option>
                <option value="4">Good</option>
                <option value="5">Very Good</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Book list with pagination */}
      <ul className="book-list">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <li
              key={book.id}
              className="book-list-item"
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <div className="box">
                <div className="book-list-view">
                  <FaEye /> <p>{book.view}</p>
                </div>
                <div className="book-list-dollar">
                  <FaDollarSign /> <p>{book.price}</p>
                </div>
              </div>
              <img
                src={book.avatar}
                alt={book.name}
                className="book-list-img"
              />
              <h2 className="book-list-title">{book.name}</h2>
              <p className="book-list-author">{book.author}</p>
              <p className="book-list-desc">{book.description}</p>
              <p className="book-list-genre">Genre: {book.genre}</p>
            </li>
          ))
        ) : (
          <h3 className="no-books">Not found!</h3>
        )}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ⬅
          </button>

          {showLeftDots && <span>...</span>}
          {buttons.map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          {showRightDots && <span>...</span>}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ➡
          </button>
        </div>
      )}
      <BookRandom filtereds={filtereds} />
    </div>
  );
};

export default BookPage;
