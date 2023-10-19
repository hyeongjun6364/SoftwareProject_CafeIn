import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../../style/common_style/footer.scss"
import Category from '../../asset/common/category.png';
import Community from '../../asset/common/community.png';
import Home from '../../asset/common/home.png';
import Mapping from '../../asset/common/mapping.png';
import Mypage from '../../asset/common/mypage.png';
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
          <Link to="/category">
            <img src={Category}/>
          </Link>
          <Link to="/map"><img src={Mapping}/></Link>
          <Link to="/"><img src={Home}/></Link>
          <Link to="/community"><img src={Community}/></Link>
          <Link to="/mypage"><img src={Mypage}/></Link>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer
