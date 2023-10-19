import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../../style/common_style/footer.scss"

function Footer() {
  const [isVisible, setIsVisible] = useState(true)
  const [prevScrollY, setPrevScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > prevScrollY) {
        // 스크롤을 아래로 내릴 때: 푸터 숨김
        setIsVisible(false)
      } else {
        // 스크롤을 위로 올릴 때: 푸터 나타냄
        setIsVisible(true)
      }

      setPrevScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollY])

  return (
    <footer className={`footer ${isVisible ? "" : "hidden"}`}>
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/category">카테고리</Link>
          <Link to="/map">근처 카페</Link>
          <Link to="/">홈</Link>
          <Link to="/community">커뮤니티</Link>
          <Link to="/mypage">마이페이지</Link>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer
