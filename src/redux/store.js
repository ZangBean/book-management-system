import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './slices/bookSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'books',
  storage,
}

const persistedReducer = persistReducer(persistConfig, bookReducer)

const store = configureStore({
  reducer: {
    books: persistedReducer,
  },
})

export const persistor = persistStore(store)

export default store
