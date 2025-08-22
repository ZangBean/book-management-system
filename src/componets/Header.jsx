import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Header.component.css";
import logo from "../assets/logo.png";
import ModalAddBook from "../pages/BookForm";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const Header = ({ books, setBooks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allBooks] = useState(books);
  const [suggestions, setSuggestions] = useState([]);
  const moveAreaRef = useRef(null);

  const handleAddBook = (newBook) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setBooks(allBooks);
    } else {
      const filteredBooks = allBooks.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBooks(filteredBooks);
    }
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = allBooks.filter((book) =>
        book.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  };

  const handleSuggestionClick = (bookName) => {
    setSearchTerm(bookName);
    setSuggestions([]);
    setBooks(
      allBooks.filter((book) =>
        book.name.toLowerCase().includes(bookName.toLowerCase())
      )
    );
  };

  return (
    <header className="header-content">
      <div className="header container">
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="logo" />
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/genre"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Genre
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          About
        </NavLink>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>
            <FaSearch className="search-button" />
          </button>

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((book, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(book.name)}
                >
                  {book.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="move-area"
          ref={moveAreaRef}
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus />
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
