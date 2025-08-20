import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBookById, deleteBook } from '../services/bookService'
import '../styles/BookDetail.css'

const BookDetail = () => {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchBook = async (id) => {
    try {
      setLoading(true)
      const res = await getBookById(id)
      console.log('book:', res.data)
      setBook(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc muốn xóa sách này không?')) {
      try {
        await deleteBook(id)
        alert('Xóa thành công!')
        navigate('/')
      } catch (err) {
        alert('Xóa thất bại: ' + err.message)
      }
    }
  }

  useEffect(() => {
    fetchBook(id)
  }, [id])

  if (loading) return <p>Đang tải...</p>
  if (error) return <p style={{ color: 'red' }}>Lỗi: {error}</p>
  if (!book) return <p>Không tìm thấy sách</p>

  return (
    <div className='book-detail-container'>
      <img src={book.avatar} alt={book.name} className='book-image' />
      <div className='book-info'>
        <h1>{book.name}</h1>
        <p>
          <strong>Tác giả:</strong> {book.author}
        </p>
        <p>
          <strong>Thể loại:</strong> {book.genre}
        </p>
        <p>
          <strong>Nhà xuất bản:</strong> {book.publisher}
        </p>
        <p>
          <strong>Giá:</strong> ${book.price}
        </p>
        <p>
          <strong>Mô tả:</strong> {book.description}
        </p>
        <div className='button-group'>
          <button
            className='btn edit'
            onClick={() => navigate(`/books/edit/${id}`)}
          >
            Sửa
          </button>
          <button className='btn delete' onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookDetail
