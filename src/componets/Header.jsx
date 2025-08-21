
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.component.css'
import logo from '../assets/logo.png'
import ModalAddBook from '../pages/BookForm'
import { FaSearch } from 'react-icons/fa'

const Header = ({ books, setBooks, filtereds, setFiltereds }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [allBooks] = useState(filtereds) // giữ danh sách gốc
  const [suggestions, setSuggestions] = useState([])

    const handleAddBook = (newBook) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFiltereds(allBooks)
    } else {
      const filteredBooks = allBooks.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFiltereds(filteredBooks)
    }
    setSuggestions([]) // clear gợi ý sau khi search
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.trim() === '') {
      setSuggestions([])
    } else {
      const filtered = allBooks.filter((book) =>
        book.name.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5)) // lấy max 5 gợi ý
    }
  }

  const handleSuggestionClick = (bookName) => {
    setSearchTerm(bookName)
    setSuggestions([])
    setFiltereds(
      allBooks.filter((book) =>
        book.name.toLowerCase().includes(bookName.toLowerCase())
      )
    )
  }


  return (
    <header className="header-content">
      <div className="header container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/genre" className="nav-link">
          Genre
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>

        <div className='search-container'>
          <input
            type='text'
            placeholder='Search...'
            className='search-input'
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
          <button onClick={handleSearch}>
            <FaSearch className='search-button' />
          </button>

          {/* Danh sách gợi ý */}
          {suggestions.length > 0 && (
            <ul className='suggestions-list'>
              {suggestions.map((book, index) => (
                <li
                  key={index}
                  className='suggestion-item'
                  onClick={() => handleSuggestionClick(book.name)}
                >
                  {book.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={() => setIsModalOpen(true)} className='circle-button'>
          +
        </button>
        <ModalAddBook
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddBook={handleAddBook}
          books={books}
        />
      </div>
    </header>
  );
};

export default Header;
