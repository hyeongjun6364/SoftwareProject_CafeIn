// Footer.js

import React, { useEffect, useState } from 'react';
import '../style/common_style/footer.scss';

function Footer() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // 스크롤이 화면 하단에 도달하면 Footer를 고정
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`footer-static ${isSticky ? 'sticky' : ''}`}>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <a href="#">카테고리</a>
            <a href="#">홈</a>
            <a href="#">커뮤니티</a>
          </div>
          <div className="footer-social">
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
