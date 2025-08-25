import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBookById, deleteBook } from '../services/bookService'
import '../styles/BookDetail.css'
import Loading from '../componets/Loading'
import ModalAddBook from '../pages/BookForm'
import renderStars from '../ultils/renderStars'
import { FaEye } from 'react-icons/fa6'
import { formatNumber } from '../ultils/formatNumber'
import BookRandom from '../componets/BookRandom'
import { useDispatch, useSelector } from 'react-redux'
import {
  editBook as editBookAction,
  removeBook,
} from '../redux/slices/bookSlice'

const BookDetail = () => {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const books = useSelector((state) => state.books.items)

  const fetchBook = async (id) => {
    try {
      setLoading(true)
      const res = await getBookById(id)
      setBook(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateBook = (updatedBook) => {
    dispatch(editBookAction(updatedBook)) // cập nhật trong Redux
    setBook(updatedBook)
  }

  const openEditModal = (book) => {
    setEditingBook(book)
    setIsModalOpen(true)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id)
        dispatch(removeBook(id)) // xoá trong Redux
        alert('Deleted successfully!')
        navigate('/')
      } catch (err) {
        alert('Failed to delete: ' + err.message)
      }
    }
  }

  useEffect(() => {
    fetchBook(id)
  }, [id])

  if (loading) return <Loading />
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
  if (!book) return <p>Book not found</p>

  return (
    <>
      <div className='book-detail-container'>
        <img src={book.avatar} alt={book.name} className='book-image' />
        <div className='book-info'>
          <h1>{book.name}</h1>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>
          <p>
            <strong>Price:</strong> ${book.price}
          </p>
          <p>
            <strong>Description:</strong> {book.description}
          </p>
          <p>
            <strong>Total views:</strong> <FaEye /> {formatNumber(book.view)}
          </p>
          <p>
            <strong>Rating:</strong> {renderStars(book.rate)}
          </p>

          <div className='button-group'>
            <div>
              <button className='btn edit' onClick={() => openEditModal(book)}>
                Edit
              </button>
              <ModalAddBook
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpdateBook={handleUpdateBook}
                books={books}
                editBook={editingBook}
              />
              <button className='btn delete' onClick={handleDelete}>
                Delete
              </button>
            </div>
            <button className='btn back' onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
      <BookRandom filtereds={books} />
    </>
  )
}

export default BookDetail
