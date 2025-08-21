import React from 'react'

const Loading = () => {
  return (
    <>
      <div className='loading-overlay'>
        <div className='spinner'></div>
      </div>

      {/* CSS chung viết ngay trong component */}
      <style>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 6px solid #ddd;
          border-top: 6px solid #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}

export default Loading
