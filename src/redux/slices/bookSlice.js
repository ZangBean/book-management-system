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
    items: [], // full dữ liệu gốc (luôn giữ)
    displayItems: [], // dữ liệu hiển thị (chịu search/filter)
    loading: false,
    error: null,
  },
  reducers: {
    filterBooks: (state, action) => {
      const searchTerm = action.payload.toLowerCase()
      state.displayItems = state.items.filter((book) =>
        book.name.toLowerCase().includes(searchTerm)
      )
    },
    resetBooks: (state) => {
      state.displayItems = state.items
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.displayItems = action.payload // đồng bộ lần đầu
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
        state.displayItems.unshift(action.payload)
      })
      .addCase(editBook.fulfilled, (state, action) => {
        const index = state.items.findIndex((b) => b.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload

        const index2 = state.displayItems.findIndex(
          (b) => b.id === action.payload.id
        )
        if (index2 !== -1) state.displayItems[index2] = action.payload
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.payload)
        state.displayItems = state.displayItems.filter(
          (b) => b.id !== action.payload
        )
      })
  },
})

export const { filterBooks, resetBooks } = bookSlice.actions
export default bookSlice.reducer
