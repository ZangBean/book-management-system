import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./componets/Header";
import Footer from "./componets/Footer";
import BookPage from "./pages/BookPage";
import BookForm from "./pages/BookForm";
import GenrePage from "./pages/GenrePage";
import AboutPage from "./pages/AboutPage";
import { getBooks } from "./services/bookService";

function App() {
  const onChange = () => {};
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await getBooks();
      setBooks(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();

    return () => {};
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<BookPage books={books} />} />
        <Route path="/bookform/:id" element={<BookForm />} />
        <Route path="/genre" element={<GenrePage books={books} />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
