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

import AboutPage from './pages/AboutPage'
import { getBooks } from './services/bookService'
import BookDetail from './pages/BookDetail'
import GenrePage from './pages/GenrePage'
import Loading from './componets/Loading'

function App() {
  const [books, setBooks] = useState([])
  const [filtereds, setFiltereds] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetchBooks = async () => {
    try {
      setLoading(true)
      const res = await getBooks()
      setBooks(res)
      setFiltereds(res)
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
      <Header
        books={books}
        setBooks={setBooks}
        filtereds={filtereds}
        setFiltereds={setFiltereds}
      />
      <Routes>
        <Route path='/about' element={<AboutPage />} />
        <Route
          path='/'
          element={<BookPage books={books} filtereds={filtereds} />}
        />
        <Route path='/book/:id' element={<BookDetail setBooks={setBooks} />} />
        <Route path='/genre' element={<GenrePage books={books} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

