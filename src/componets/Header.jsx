import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.component.css";
import logo from "../assets/logo.png";
import ModalAddBook from "../pages/BookForm";
import { FaSearch } from "react-icons/fa";

const Header = ({ books, setBooks, filtereds, setFiltereds }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allBooks] = useState(filtereds);
  const [suggestions, setSuggestions] = useState([]);
  const moveAreaRef = useRef(null);

  const handleAddBook = (newBook) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFiltereds(allBooks);
    } else {
      const filteredBooks = allBooks.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltereds(filteredBooks);
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
    setFiltereds(
      allBooks.filter((book) =>
        book.name.toLowerCase().includes(bookName.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const eyes = moveAreaRef.current?.querySelectorAll(".eye") || [];
      eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const rad = Math.atan2(event.pageX - x, event.pageY - y);
        const rot = rad * (180 / Math.PI) * -1 + 180;
        eye.style.transform = `rotate(${rot}deg)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
          <div className="box-eye">
            <div className="eye"></div>
            <div className="eye"></div>
          </div>
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
