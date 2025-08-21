import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const BookPage = ({ books }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Total number of pages
  const totalPages = Math.ceil(books.length / itemsPerPage);

  // Calculate start and end index
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  return (
    <div className="book-page container">
      <h1 className="page-title">Featured Books</h1>
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
        {books.slice(1, 10).map((book) => (
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

      {/* Book list below slider with pagination */}
      <h1 className="page-title">New Books</h1>
      <ul className="book-list">
        {currentBooks.map((book) => (
          <li
            key={book.id}
            className="book-list-item"
            onClick={() => navigate(`/book/${book.id}`)}
          >
            <img src={book.avatar} alt={book.name} className="book-list-img" />
            <h2 className="book-list-title">{book.name}</h2>
            <p className="book-list-author">{book.author}</p>
            <p className="book-list-desc">{book.description}</p>
            <p className="book-list-genre">Genre: {book.genre}</p>
          </li>
        ))}
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
