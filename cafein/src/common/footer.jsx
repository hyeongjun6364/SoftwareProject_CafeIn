import React from 'react'
import '../style/common_style/footer.scss'
function footer() {
    return (
        <div className="footer-static">
          {/* 다른 컴포넌트들을 여기에 추가 */}
          <footer className="footer">
            <div className="footer-container">
              <div className="footer-logo">무신사</div>
              <div className="footer-links">
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

export default footer