import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import {
  FaArrowDownAZ,
  FaArrowUpZA,
  FaBook,
  FaBookAtlas,
  FaArrowUp91,
  FaArrowDown19
} from "react-icons/fa6";
import "../styles/BookPage.css";


const BookPage = ({ books, filtereds }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRate, setSelectedRate] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc"); // Sắp xếp theo view
  const itemsPerPage = 10;

  // Reset page khi books thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [books, filtereds, selectedRate, sortOrder]);

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

  return (
    <div className="book-page container">
      <div className="page-title">
        <FaBook />
        <h1>Featured Books</h1>
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
          1024: { slidesPerView: 4 },
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
          <FaBookAtlas />
          <h1>Lists Books</h1>
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

              {sortOrder === 'asc' ? (
                <FaArrowUp91 className='' />
              ) : (
                <FaArrowDown19 className='rotate' />
              )}
            </button>
          </div>

          <div className="filter-group">
            <label htmlFor="rate-filter" className="filter-label">
              Filter :
            </label>
            <select
              id="rate-filter"
              value={selectedRate}
              onChange={(e) => setSelectedRate(e.target.value)}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="1"> Very Bad</option>
              <option value="2"> Bad</option>
              <option value="3"> Nomal</option>
              <option value="4"> Good</option>
              <option value="5"> Very Good</option>
            </select>
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
          <h3 className="no-books">Not find !!!</h3>
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

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default BookPage;
