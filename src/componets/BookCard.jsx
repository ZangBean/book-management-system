import React from 'react'

const BookCard = ({ book }) => {
  return (
    <div className='book-card'>
      <img src={book.avatar} alt={book.name} className='book-img' />
      <h2 className='book-title'>{book.name}</h2>
      <p className='book-author'>{book.author}</p>
      <p className='book-genre'>{book.genre}</p>
      <p className='book-price'>${book.price}</p>
    </div>
  )
}

export default BookCard
