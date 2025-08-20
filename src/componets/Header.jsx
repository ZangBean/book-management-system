import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/book">Book</Link>
      <Link to="/book-form">Book Form</Link>
      <Link to="/genre">Genre</Link>
      <Link to="/about">About</Link>
    </div>
  );
};

export default Header;
