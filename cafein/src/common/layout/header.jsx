import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useRecoilState } from "recoil"
import { loggedInState } from "../../page/mypage/auth" 
import "../../style/common_style/header.scss"
import searchimg from '../../asset/common/reading_glasses.png'
const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLogged, setIsLogged] = useRecoilState(loggedInState)
  const storedLoginStatus = localStorage.getItem("login")
  // 항목 클릭 시 상태 업데이트
  const handleItemClick = (item) => {
    setSelectedItem(item)
    if (isMobileMenuOpen) {
      setMobileMenuOpen(false) 
    }
  }
  const handleLogout = async () => {
    try {
      // 로그아웃 요청을 서버로 보냄
      await axios.post("/api/auth/logout")

      // 로컬 스토리지에서 로그인 상태를 제거하고 클라이언트 상태를 업데이트
      localStorage.removeItem("login")
      localStorage.removeItem("LS_KEY_USERNAME")
      setIsLogged(false)
    } catch (error) {
      console.error("로그아웃 오류:", error)
    }
  }

  return (
    <div>
      <header className="header">
        
          <div className="logo" onClick={() => handleItemClick(null)}>
            <Link to="/">CAFE IN</Link>
          </div>
          {/* {isMobileMenuOpen ? "" :<img src={searchimg} className="" alt="reading_glasses" style={{width:"30px"}} />} */}
          
        
        

        {/* Mobile menu icon */}
        <div
          className="mobile-menu-icon"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </div>
        </header>
      

      <nav className={`container ${isMobileMenuOpen ? "open" : ""}`}>
        <ul >
          {isMobileMenuOpen ?
            <li className={selectedItem === '로그인' ? 'selected' : ''}
              onClick={() => handleItemClick('로그인')}>
              <Link to="/mypage" >
                
                로그인하세요</Link>
            </li> : ""}


          <li
            className={selectedItem === "홈" ? "selected" : ""}
            onClick={() => handleItemClick("홈")}
          >
            <Link to="/">home</Link>
            {/* <div className={`border-bottom ${
                selectedItem === "홈" ? "selected" : ""
              }`}>

          </div> */}
          </li>

          <li
            className={selectedItem === "카페목록" ? "selected" : ""}
            onClick={() => handleItemClick("카페목록")}
          >
            <Link to="/category">category</Link>
          </li>
          <li
            className={selectedItem === "마이페이지" ? "selected" : ""}
            onClick={() => handleItemClick("마이페이지")}
          >
            <Link to="/map">map</Link>
          </li>
          <li
            className={selectedItem === "메뉴4" ? "selected" : ""}
            onClick={() => handleItemClick("메뉴4")}
          >
            <Link to="/mypage">mypage</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Menu
