import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import '../styles/BookPage.css'

// import './BookPage.css'

const BookPage = ({ books }) => {
  return (
    <div className='book-page'>
      <h1 className='page-title'>Book Page</h1>

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
        className='book-slider'
      >
        {books.slice(1, 19).map((book) => (
          <SwiperSlide key={book.id}>
            <div className='book-card'>
              <img
                src={book.avatar}
                alt={book.name}
                className='book-img'
                loading='lazy'
              />
              <h2 className='book-title'>{book.name}</h2>
              <p className='book-author'>{book.author}</p>
              <p className='book-genre'>{book.genre}</p>
              <p className='book-price'>${book.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* List dưới slider */}
      <ul className='book-list'>
        {books.map((book) => (
          <li key={book.id} className='book-list-item'>
            <img
              src={book.avatar}
              alt={book.name}
              className='book-list-img'
              loading='lazy'
            />
            <h2 className='book-list-title'>{book.name}</h2>
            <p className='book-list-author'>{book.author}</p>
            <p className='book-list-desc'>{book.description}</p>
            <p className='book-list-genre'>Genre: {book.genre}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookPage

