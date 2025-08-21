import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './componets/Header'
import Footer from './componets/Footer'
import BookPage from './pages/BookPage'
import BookForm from './pages/BookForm'

import AboutPage from './pages/AboutPage'
import { getBooks } from './services/bookService'
import BookDetail from './pages/BookDetail'
import GenrePage from './pages/GenrePage'
import Loading from './componets/Loading'

function App() {
  const onChange = () => {}
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetchBooks = async () => {
    try {
      setLoading(true)
      const res = await getBooks()
      setBooks(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchBooks()

    return () => {}
  }, [])

  if (loading) return <Loading />
  if (error) return <p style={{ color: 'red' }}>Lỗi: {error}</p>

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/about' element={<AboutPage />} />
        <Route path='/' element={<BookPage books={books} />} />
        <Route path='/book/:id' element={<BookDetail />} />
        <Route path='/bookform' element={<BookForm />} />
        <Route path='/genre' element={<GenrePage books={books} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

