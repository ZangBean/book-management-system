import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from '../../services/bookService'

// Async actions
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const res = await getBooks()
  return res
})

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  const res = await createBook(book)
  return res
})

export const editBook = createAsyncThunk(
  'books/editBook',
  async ({ id, data }) => {
    const res = await updateBook(id, data)
    return res
  }
)

export const removeBook = createAsyncThunk('books/removeBook', async (id) => {
  await deleteBook(id)
  return id
})

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // nếu cần filter/search local
    filterBooks: (state, action) => {
      state.items = state.items.filter((book) =>
        book.name.toLowerCase().includes(action.payload.toLowerCase())
      )
    },
    resetBooks: (state, action) => {
      state.items = action.payload // reset từ data gốc
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Add
      .addCase(addBook.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      // Edit
      .addCase(editBook.fulfilled, (state, action) => {
        const index = state.items.findIndex((b) => b.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      // Delete
      .addCase(removeBook.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.payload)
      })
  },
})

export const { filterBooks, resetBooks } = bookSlice.actions
export default bookSlice.reducer
