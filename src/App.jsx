import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './componets/Header'
import Footer from './componets/Footer'
import BookPage from './pages/BookPage'
import AboutPage from './pages/AboutPage'
import BookDetail from './pages/BookDetail'
import GenrePage from './pages/GenrePage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<BookPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/book/:id' element={<BookDetail />} />
        <Route path='/genre' element={<GenrePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

