import React, { useState, useEffect } from "react";
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
    quantity: 0,
    description: "",
    publisher: "",
    price: "",
  });
  const [error, setError] = useState(null);

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

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Prepare book data with createdAt
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
        quantity: 0,
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
          <input
            type="text"
            name="name"
            placeholder="Book Title"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Genre --</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
          />
          <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            value={formData.publisher}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            min="0"
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={handleChange}
          />
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
