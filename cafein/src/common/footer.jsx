// Footer.js

import React, { useEffect, useState } from 'react';
import '../style/common_style/footer.scss';

function Footer() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className={`floating-bar ${scrollPosition ? 'floating' : ''}`}>
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
