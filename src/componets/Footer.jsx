import React from "react";
import { Link } from "react-router-dom";
import "./Footer.component.css";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/" className="logo-link">
          <img src={logo} alt="logo" />
        </Link>
        <p> BookWeb © {new Date().getFullYear()} - All Rights Reserved</p>
        <div className="footer-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            Twitter
          </a>
          <a href="/about">About</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
