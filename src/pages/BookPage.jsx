import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
import BookRandom from '../componets/BookRandom'
import {
  FaBook,
  FaBookAtlas,
  FaArrowUp91,
  FaArrowDown19,
  FaEye,
  FaDollarSign,
} from 'react-icons/fa6'
import '../styles/BookPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../redux/slices/bookSlice'
import Loading from '../componets/Loading'

const BookPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    items: allBooks,
    displayItems: reduxBooks,
    loading,
    error,
  } = useSelector((state) => state.books)

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRate, setSelectedRate] = useState('all')
  const [sortOrder, setSortOrder] = useState('asc')
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  // Responsive itemsPerPage
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 1024) setItemsPerPage(6)
      else if (window.innerWidth <= 1200) setItemsPerPage(8)
      else setItemsPerPage(10)
    }
    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  // Filter + sort local trên reduxBooks
  const filteredBooks = React.useMemo(() => {
    let list = [...reduxBooks]

    if (selectedRate !== 'all') {
      list = list.filter((b) => Math.floor(b.rate) === parseInt(selectedRate))
    }

    list.sort((a, b) =>
      sortOrder === 'asc' ? a.view - b.view : b.view - a.view
    )

    return list
  }, [reduxBooks, selectedRate, sortOrder])

  if (loading) return <Loading />
  if (error) return <p>{error}</p>
  if (!allBooks.length) return <p>No books found</p>

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const maxPageButtons = 5
  const getPaginationButtons = () => {
    const half = Math.floor(maxPageButtons / 2)
    let startPage = Math.max(1, currentPage - half)
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1)

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1)
    }

    const buttons = []
    for (let i = startPage; i <= endPage; i++) buttons.push(i)

    return {
      buttons,
      showLeftDots: startPage > 1,
      showRightDots: endPage < totalPages,
    }
  }

  const { buttons, showLeftDots, showRightDots } = getPaginationButtons()

  return (
    <div className='book-page container'>
      {/* Featured Books */}
      <div className='page-title'>
        <div className='title-box'>
          <FaBook />
          <h1>Featured Books</h1>
        </div>
      </div>

      {/* Swiper luôn dùng allBooks gốc */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
          1600: { slidesPerView: 4 },
        }}
        className='book-slider'
      >
        {allBooks.slice(0, 5).map((book) => (
          <SwiperSlide
            key={book.id}
            onClick={() => navigate(`/book/${book.id}`)}
          >
            <div className='book-card'>
              <img src={book.avatar} alt={book.name} className='book-img' />
              <h2 className='book-title'>{book.name}</h2>
              <p className='book-author'>{book.author}</p>
              <p className='book-genre'>{book.genre}</p>
              <p className='book-price'>${book.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* List header */}
      <div className='list-header'>
        <div className='page-title'>
          <div className='title-box'>
            <FaBookAtlas />
            <h1>List of Books</h1>
          </div>
          <div className='filter-container'>
            <div className='filter-group'>
              <label className='filter-label'>Sort by views:</label>
              <button
                onClick={() =>
                  setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                }
                className='filter-button'
              >
                {sortOrder === 'asc' ? <FaArrowUp91 /> : <FaArrowDown19 />}
              </button>
            </div>
            <div className='filter-group'>
              <label htmlFor='rate-filter' className='filter-label'>
                Filter:
              </label>
              <select
                id='rate-filter'
                value={selectedRate}
                onChange={(e) => setSelectedRate(e.target.value)}
                className='filter-select'
              >
                <option value='all'>All</option>
                <option value='1'>Very Bad</option>
                <option value='2'>Bad</option>
                <option value='3'>Normal</option>
                <option value='4'>Good</option>
                <option value='5'>Very Good</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Book list */}
      <ul className='book-list'>
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <li
              key={book.id}
              className='book-list-item'
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <div className='box'>
                <div className='book-list-view'>
                  <FaEye /> <p>{book.view}</p>
                </div>
                <div className='book-list-dollar'>
                  <FaDollarSign /> <p>{book.price}</p>
                </div>
              </div>

              <img
                src={book.avatar}
                alt={book.name}
                className='book-list-img'
              />

              <h2 className='book-list-title'>{book.name}</h2>
              <p className='book-list-author'>Author: {book.author}</p>
              <p className='book-list-desc'>{book.description}</p>
              <p className='book-list-genre'>Genre: {book.genre}</p>
            </li>
          ))
        ) : (
          <h3 className='no-books'>Not found!</h3>
        )}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='pagination'>
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
              className={currentPage === page ? 'active' : ''}
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

      {/* Random Books */}
      <BookRandom filtereds={allBooks} />
    </div>
  )
}

export default BookPage

