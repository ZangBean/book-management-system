import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Header from "./componets/Header";
import Footer from "./componets/Footer";
import BookPage from "./pages/BookPage";
import BookForm from "./pages/BookForm";
import HomePage from "./pages/HomePage";
import GernePage from "./pages/GernePage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/book-form" element={<BookForm />} />
        <Route path="/genre" element={<GernePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
