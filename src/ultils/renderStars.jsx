import '../styles/BookDetail.css'
import { FaStar } from 'react-icons/fa6'
const renderStars = (rate) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} style={{ color: i < rate ? '#ffc107' : '#e4e5e9' }}>
        <FaStar className='icon-stars' />
      </span>
    )
  }
  return stars
}

export default renderStars
