import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.component.css'
import logo from '../assets/logo.png'
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <Link to='/' className='logo-link'>
          <img src={logo} alt='logo' />
        </Link>
        <p> BookWeb © {new Date().getFullYear()} - All Rights Reserved</p>
        <div className='footer-links'>
          <a href='https://facebook.com' target='_blank' rel='noreferrer'>
            <FaFacebook />
          </a>
          <a href='https://twitter.com' target='_blank' rel='noreferrer'>
            <FaTwitter />
          </a>
          <a href='https://youtube.com' target='_blank' rel='noreferrer'>
            <FaYoutube />
          </a>
          <a href='/about'></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

