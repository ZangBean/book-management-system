import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaDollarSign } from 'react-icons/fa'

const ListBook = ({ book }) => {
  const navigate = useNavigate()
  return (
    <li className='book-list-item' onClick={() => navigate(`/book/${book.id}`)}>
      <div className='box'>
        <div className='book-list-view'>
          <FaEye /> <p>{book.view}</p>
        </div>
        <div className='book-list-dollar'>
          <FaDollarSign /> <p>{book.price}</p>
        </div>
      </div>

      <img src={book.avatar} alt={book.name} className='book-list-img' />

      <h2 className='book-list-title'>{book.name}</h2>
      <p className='book-list-author'>Author: {book.author}</p>
      <p className='book-list-desc'>{book.description}</p>
      <p className='book-list-genre'>Genre: {book.genre}</p>
    </li>
  )
}

export default ListBook
