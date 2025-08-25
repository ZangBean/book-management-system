import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookRandom from '../componets/BookRandom'
import { FaBookBookmark } from 'react-icons/fa6'
import '../styles/GenrePage.css'
import { useSelector } from 'react-redux'

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

  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage)

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
              <li
                key={book.id}
                className='book-list-item'
                onClick={() => navigate(`/book/${book.id}`)}
              >
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

          {totalPages > 1 && (
            <div className='pagination'>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                ⬅
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={currentPage === index + 1 ? 'active' : ''}
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
          <BookRandom filtereds={books} />
        </div>
      )}
    </div>
  )
}

export default GenrePage

