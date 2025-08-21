import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, deleteBook } from "../services/bookService";
import "../styles/BookDetail.css";
import Loading from "../componets/Loading";

const BookDetail = ({ setBooks }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBook = async (id) => {
    try {
      setLoading(true);
      const res = await getBookById(id);
      console.log("book:", res.data);
      setBook(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        // Update the book list by filtering out the deleted book
        if (typeof setBooks === "function") {
          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } else {
          console.warn("setBooks is not a function");
        }
        alert("Deleted successfully!");
        navigate("/");
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  };

  useEffect(() => {
    fetchBook(id);
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div className="book-detail-container">
      <img src={book.avatar} alt={book.name} className="book-image" />
      <div className="book-info">
        <h1>{book.name}</h1>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>Publisher:</strong> {book.publisher}
        </p>
        <p>
          <strong>Price:</strong> ${book.price}
        </p>
        <p>
          <strong>Description:</strong> {book.description}
        </p>
        <div className="button-group">
          <div>
            <button
              className="btn edit"
              onClick={() => navigate(`/books/edit/${id}`)}
            >
              Edit
            </button>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <button className="btn back" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
