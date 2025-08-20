import React from "react";
import { Link } from "react-router-dom";
import "./Header.component.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo-link">
        <img src={logo} alt="logo" />
      </Link>
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/genre" className="nav-link">
        Genre
      </Link>
      <Link to="/about" className="nav-link">
        About
      </Link>
      <input type="text" placeholder="Search..." className="search-input" />
      <button className="circle-button">+</button>
    </div>
  );
};

export default Header;
