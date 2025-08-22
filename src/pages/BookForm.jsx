import React, { useState, useEffect, useRef } from "react";
import { createBook, updateBook } from "../services/bookService";

const ModalAddBook = ({
  isOpen,
  onClose,
  onAddBook,
  onUpdateBook,
  books,
  editBook,
}) => {
  const genres = [...new Set((books || []).map((book) => book.genre))];
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    author: "",
    status: "available",
    genre: "",
    quantity: 1,
    description: "",
    publisher: "",
    price: "",
  });
  const [error, setError] = useState(null);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const genreRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    if (editBook) {
      setFormData({
        name: editBook.name || "",
        avatar: editBook.avatar || "",
        author: editBook.author || "",
        status: editBook.status || "available",
        genre: editBook.genre || "",
        quantity: editBook.quantity || 0,
        description: editBook.description || "",
        publisher: editBook.publisher || "",
        price: editBook.price || "",
      });
    }
  }, [editBook]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (genreRef.current && !genreRef.current.contains(e.target)) {
        setIsGenreOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "genre") setIsGenreOpen(false);
    if (name === "status") setIsStatusOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.genre) {
      setError("Please select a genre");
      return;
    }

    const bookData = {
      ...formData,
      createdAt: new Date().toISOString(),
    };

    try {
      if (editBook) {
        const updatedBook = await updateBook(editBook.id, bookData);
        onUpdateBook(updatedBook);
      } else {
        const savedBook = await createBook(bookData);
        onAddBook(savedBook);
      }
      setFormData({
        name: "",
        avatar: "",
        author: "",
        status: "available",
        genre: "",
        quantity: 1,
        description: "",
        publisher: "",
        price: "",
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save book to API");
      console.error("Error saving book:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editBook ? "Edit Book" : "Add New Book"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div>
            <label htmlFor="name">Title</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Book Title"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <label htmlFor="">Genre</label>
            <div className="dropdown" ref={genreRef}>
              <div
                className="dropdown-toggle"
                onClick={() => setIsGenreOpen(!isGenreOpen)}
              >
                {formData.genre || "-- Select Genre --"}
              </div>
              {isGenreOpen && (
                <ul className="dropdown-menu">
                  {genres.map((genre, index) => (
                    <li
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleSelect("genre", genre)}
                    >
                      {genre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {error && <p className="error">{error}</p>}
            <label htmlFor="">Status</label>
            <div className="dropdown" ref={statusRef}>
              <div
                className="dropdown-toggle"
                onClick={() => setIsStatusOpen(!isStatusOpen)}
              >
                {formData.status === "available" ? "Available" : "Unavailable"}
              </div>
              {isStatusOpen && (
                <ul className="dropdown-menu">
                  <li
                    className="dropdown-item"
                    onClick={() => handleSelect("status", "available")}
                  >
                    Available
                  </li>
                  <li
                    className="dropdown-item"
                    onClick={() => handleSelect("status", "unavailable")}
                  >
                    Unavailable
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
            />
            <label htmlFor="publisher">Publisher</label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              placeholder="Publisher"
              value={formData.publisher}
              onChange={handleChange}
            />
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            <label htmlFor="avatar">Avatar URL</label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              placeholder="Avatar URL"
              value={formData.avatar}
              onChange={handleChange}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {editBook ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddBook;
