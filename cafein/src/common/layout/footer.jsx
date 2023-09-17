// // Footer.js

// import React, { useEffect, useState } from "react"
// import "../../style/common_style/footer.scss"

// function Footer() {
//   const [isSticky, setIsSticky] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         // 스크롤이 화면 하단에 도달하면 Footer를 고정
//         setIsSticky(true)
//       } else {
//         setIsSticky(false)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)

//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [])

//   return (
//     <div className={`footer-static ${isSticky ? "sticky" : ""}`}>
//       <footer className="footer">
//         <div className="footer-container">
//           <div className="footer-links">
//             <a href="#">카테고리</a>
//             <a href="#">홈</a>
//             <a href="#">커뮤니티</a>
//           </div>
//           <div className="footer-social">
//             <a href="#">
//               <i className="fab fa-instagram"></i>
//             </a>
//             <a href="#">
//               <i className="fab fa-facebook"></i>
//             </a>
//             <a href="#">
//               <i className="fab fa-twitter"></i>
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default Footer

import React, { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import "../../style/common_style/footer.scss"
import MyPage from "../../page/mypage/mypage"

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
          <Link to="/">홈</Link>
          <Link to="/community">커뮤니티</Link>
          <Link to="/mypage">마이페이지</Link>
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
  )
}

export default Footer
