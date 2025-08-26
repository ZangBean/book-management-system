import React from 'react'

const PaginationComponent = ({
  currentPage,
  setCurrentPage,
  showLeftDots,
  buttons,
  showRightDots,
  totalPages,
}) => {
  return (
    <div className='pagination'>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        ⬅
      </button>

      {showLeftDots && <span>...</span>}
      {buttons.map((page) => (
        <button
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      {showRightDots && <span>...</span>}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        ➡
      </button>
    </div>
  )
}

export default PaginationComponent
