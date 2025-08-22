import React from 'react'
import '../styles/AboutPage.css' // Ensure you have this CSS file for styling

const AboutPage = () => {
  return (
    <div className='about-page'>
      <div className='about-container'>
        {/* HERO */}
        <section className='about-hero'>
          <div className='hero-left'>
            <span className='badge'>ABOUT US</span>
            <h1 className='title'>Thư viện số cho mọi người 📚</h1>
            <p className='subtitle'>
              Chúng tôi xây dựng nền tảng giúp bạn khám phá, theo dõi và quản lý
              sách một cách trực quan — từ người đọc bình thường đến mọt sách
              thứ thiệt.
            </p>
          </div>

          <div className='hero-right'>
            <div className='stat-card'>
              <div className='stat-number'>50k+</div>
              <div className='stat-label'>Lượt xem/tháng</div>
            </div>
            <div className='stat-card'>
              <div className='stat-number'>5k+</div>
              <div className='stat-label'>Thành viên</div>
            </div>
            <div className='stat-card'>
              <div className='stat-number'>8,2/10</div>
              <div className='stat-label'>Đánh giá hài lòng</div>
            </div>
          </div>
        </section>

        {/* SỨ MỆNH / TẦM NHÌN / CÁCH LÀM */}
        <section className='about-section'>
          <h2 className='section-title'>Chúng tôi làm gì?</h2>
          <div className='cards'>
            <div className='card'>
              <h3 className='card-title'>🎯 Sứ mệnh</h3>
              <p className='card-text'>
                Kết nối độc giả với kho sách phong phú, dễ tiếp cận và giàu trải
                nghiệm.
              </p>
            </div>
            <div className='card'>
              <h3 className='card-title'>🧭 Tầm nhìn</h3>
              <p className='card-text'>
                Trở thành nền tảng quản lý và khám phá sách thân thiện nhất tại
                Việt Nam.
              </p>
            </div>
            <div className='card'>
              <h3 className='card-title'>🛠️ Cách chúng tôi làm</h3>
              <p className='card-text'>
                Giao diện trực quan, phân trang mượt, tìm kiếm nhanh, và dữ liệu
                sync từ API.
              </p>
            </div>
          </div>
        </section>

        {/* GIÁ TRỊ CỐT LÕI */}
        <section className='about-section'>
          <h2 className='section-title'>Giá trị cốt lõi</h2>
          <div className='values-row'>
            <div className='pill'>Tối giản</div>
            <div className='pill'>Nhanh & Mượt</div>
            <div className='pill'>Minh bạch</div>
            <div className='pill'>Lắng nghe</div>
          </div>
        </section>

        {/* LIÊN HỆ */}
        <section className='about-section'>
          <div className='contact'>
            <p className='contact-text'>
              Bạn có ý tưởng hay muốn hợp tác? Chúng tôi luôn sẵn sàng nghe bạn.
            </p>
            <button
              className='contact-btn'
              onClick={() =>
                (window.location.href = 'mailto:hello@bookapp.dev')
              }
            >
              Liên hệ ngay
            </button>
          </div>
        </section>

        <p className='footer-note'>
          © {new Date().getFullYear()} BookApp — Built with ❤️ for readers.
        </p>
      </div>
    </div>
  )
}

export default AboutPage

