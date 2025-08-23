import React from "react";
import { useNavigate } from "react-router-dom";
import { FaDice, FaEye, FaDollarSign, FaShuffle } from "react-icons/fa6";
import { useEffect, useState } from "react";

const BookRandom = ({ books }) => {
  const navigate = useNavigate();
  const [randomBooks, setRandomBooks] = useState([]);

  const getRandomBooks = (arr, count) => {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (books && Array.isArray(books)) {
      setRandomBooks(getRandomBooks(books, 5));
    }
  }, [books]);

  const handleRandomize = () => {
    setRandomBooks(getRandomBooks(books, 5));
  };

  if (!books || !Array.isArray(books)) {
    console.error("Books prop is undefined or not an array");
    return <div>No books available</div>;
  }
  return (
    <>
      <div className="page-title">
        <div className="title-box">
          <FaDice />
          <h1>Random Books</h1>
        </div>
        <button onClick={handleRandomize} className="random-button">
          <FaShuffle />
        </button>
      </div>
      <ul className="book-list">
        {randomBooks.map((book) => (
          <li
            key={book.id}
            className="book-list-item"
            onClick={() => navigate(`/book/${book.id}`)}
          >
            <div className="box">
              <div className="book-list-view">
                <FaEye /> <p>{book.view}</p>
              </div>
              <div className="book-list-dollar">
                <FaDollarSign /> <p>{book.price}</p>
              </div>
            </div>
            <img src={book.avatar} alt={book.name} className="book-list-img" />
            <h2 className="book-list-title">{book.name}</h2>
            <p className="book-list-author">{book.author}</p>
            <p className="book-list-desc">{book.description}</p>
            <p className="book-list-genre">Genre: {book.genre}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BookRandom;
