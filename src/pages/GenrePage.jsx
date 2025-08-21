import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GenrePage = ({ books }) => {
  const navigate = useNavigate();
  const genres = [...new Set(books.map((book) => book.genre))];

  const [selectedGenre, setSelectedGenre] = useState(genres[0] || "Sci-Fi");

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genre === selectedGenre)
    : [];

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  return (
    <div className="genre-page">
      <ul className="container">
        {genres.map((genre, index) => (
          <li
            key={index}
            onClick={() => handleSelectGenre(genre)}
            style={{
              cursor: "pointer",
              fontWeight: selectedGenre === genre ? "bold" : "normal",
            }}
          >
            {genre}
          </li>
        ))}
      </ul>

      {selectedGenre && (
        <div className="book-page container">
          <h2>Books in "{selectedGenre}"</h2>
          <ul className="book-list container">
            {currentBooks.map((book) => (
              <li
                key={book.id}
                className="book-list-item"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <img
                  src={book.avatar}
                  alt={book.name}
                  className="book-list-img"
                  loading="lazy"
                />
                <h2 className="book-list-title">{book.name}</h2>
                <p className="book-list-author">{book.author}</p>
                <p className="book-list-desc">{book.description}</p>
                <p className="book-list-genre">Genre: {book.genre}</p>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GenrePage;
