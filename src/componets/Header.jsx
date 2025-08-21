
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.component.css";
import logo from "../assets/logo.png";
import ModalAddBook from "../pages/BookForm";

const Header = ({ books, setBooks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBook = (newBook) => {
    setBooks((prev) => [...prev, newBook]);
  };


  return (
    <header className='header-content'>
      <div className='header container'>
        <Link to='/' className='logo-link'>
          <img src={logo} alt='logo' />
        </Link>
        <Link to='/' className='nav-link'>
          Home
        </Link>
        <Link to='/genre' className='nav-link'>
          Genre
        </Link>
        <Link to='/about' className='nav-link'>
          About
        </Link>
        <input type="text" placeholder="Search..." className="search-input" />
        <button onClick={() => setIsModalOpen(true)} className="circle-button">
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
  )
}

export default Header

