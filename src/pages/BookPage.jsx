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
import ListBook from '../componets/ListBook'
import BookCard from '../componets/BookCard'
import BookFilter from '../componets/BookFilter'
import PaginationComponent from '../componets/Pagination'
import getPaginationButtons from '../ultils/getPagination'

const BookPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const { buttons, showLeftDots, showRightDots } = getPaginationButtons(
    currentPage,
    totalPages
  )

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
            <BookCard book={book} />
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
          <BookFilter
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            selectedRate={selectedRate}
            setSelectedRate={setSelectedRate}
          />
        </div>
      </div>

      {/* Book list */}
      <ul className='book-list'>
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => <ListBook key={book.id} book={book} />)
        ) : (
          <h3 className='no-books'>Not found!</h3>
        )}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          showLeftDots={showLeftDots}
          buttons={buttons}
          showRightDots={showRightDots}
          totalPages={totalPages}
        />
      )}

      {/* Random Books */}
      <BookRandom filtereds={allBooks} />
    </div>
  )
}

export default BookPage

