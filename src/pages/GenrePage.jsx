import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookRandom from '../componets/BookRandom'
import { FaBookBookmark } from 'react-icons/fa6'
import '../styles/GenrePage.css'
import { useSelector } from 'react-redux'
import ListBook from '../componets/ListBook'
import getPaginationButtons from '../ultils/getPagination'
import PaginationComponent from '../componets/Pagination'

const GenrePage = () => {
  const navigate = useNavigate()
  const books = useSelector((state) => state.books.items)

  const genres = [...new Set(books.map((book) => book.genre))]
  const [selectedGenre, setSelectedGenre] = useState(genres[0] || 'Sci-Fi')

  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 10

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genre === selectedGenre)
    : []

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / 10)
  const startIndex = (currentPage - 1) * 10
  const currentBooks = filteredBooks.slice(startIndex, startIndex + 10)

  const { buttons, showLeftDots, showRightDots } = getPaginationButtons(
    currentPage,
    totalPages
  )
  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre)
    setCurrentPage(1)
  }

  return (
    <div className='genre-page'>
      <ul className='container'>
        {genres.map((genre, index) => (
          <li
            key={index}
            onClick={() => handleSelectGenre(genre)}
            className={selectedGenre === genre ? 'active' : ''}
          >
            {genre}
          </li>
        ))}
      </ul>

      {selectedGenre && (
        <div className='book-page container'>
          <div className='page-title'>
            <div className='title-box'>
              <FaBookBookmark />
              <h1>Books in "{selectedGenre}"</h1>
            </div>
          </div>
          <ul className='book-list container'>
            {currentBooks.map((book) => (
              <ListBook key={book.id} book={book} />
            ))}
          </ul>

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
          <BookRandom filtereds={books} />
        </div>
      )}
    </div>
  )
}

export default GenrePage

