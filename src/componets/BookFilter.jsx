// src/components/BookFilter.jsx
import React from 'react'
import { FaArrowUp91, FaArrowDown19 } from 'react-icons/fa6'
import '../styles/BookPage.css'

const BookFilter = ({
  sortOrder,
  setSortOrder,
  selectedRate,
  setSelectedRate,
}) => {
  return (
    <div className='filter-container'>
      {/* Sort by views */}
      <div className='filter-group'>
        <label className='filter-label'>Sort by views:</label>
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
          className='filter-button'
        >
          {sortOrder === 'asc' ? <FaArrowUp91 /> : <FaArrowDown19 />}
        </button>
      </div>

      {/* Filter by rate */}
      <div className='filter-group'>
        <label htmlFor='rate-filter' className='filter-label'>
          Filter:
        </label>
        <select
          id='rate-filter'
          value={selectedRate}
          onChange={(e) => setSelectedRate(e.target.value)}
          className='filter-select'
        >
          <option value='all'>All</option>
          <option value='1'>Very Bad</option>
          <option value='2'>Bad</option>
          <option value='3'>Normal</option>
          <option value='4'>Good</option>
          <option value='5'>Very Good</option>
        </select>
      </div>
    </div>
  )
}

export default BookFilter
