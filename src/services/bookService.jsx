// src/api/bookService.js
import api from '../axios/config'
export const getBooks = () => api.get('/books')
export const getBookById = (id) => api.get(`/books/${id}`)
export const createBook = (data) => api.post('/books', data)
export const updateBook = (id, data) => api.put(`/books/${id}`, data)
export const deleteBook = (id) => api.delete(`/books/${id}`)
