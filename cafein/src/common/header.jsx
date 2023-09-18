import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/common_style/header.scss'

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 항목 클릭 시 상태 업데이트
  const handleItemClick = item => {
    setSelectedItem(item);
    if (isMobileMenuOpen) {
      setMobileMenuOpen(false); // Mobile menu close when an item is clicked
    }
  };

  return (
    <div>
      <header className="header">
      <div className="logo" onClick={() => handleItemClick(null)}>
        <Link to="/">Cafe In</Link>
      </div>

      {/* Mobile menu icon */}
      <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
        ☰
      </div>
    </header>
      
      <nav className={`container ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
        <li
            className={selectedItem === '로그인' ? 'selected' : ''}
            onClick={() => handleItemClick('로그인')}
          >
            <Link to="/login">로그인하세요</Link>
          </li>
          <li
            className={selectedItem === '홈' ? 'selected' : ''}
            onClick={() => handleItemClick('홈')}
          >
            <Link to="/">목록1</Link>
            {/* <div className={`border-bottom ${
                selectedItem === "홈" ? "selected" : ""
              }`}>

          </div> */}
          </li>
          
          <li
            className={selectedItem === '카페목록' ? 'selected' : ''}
            onClick={() => handleItemClick('카페목록')}
          >
            <Link to="/men">목록2</Link>
          </li>
          <li
            className={selectedItem === '마이페이지' ? 'selected' : ''}
            onClick={() => handleItemClick('마이페이지')}
          >
            <Link to="/women">목록3</Link>
          </li>
          <li
            className={selectedItem === '메뉴4' ? 'selected' : ''}
            onClick={() => handleItemClick('메뉴4')}
          >
            <Link to="/accessories">메뉴4</Link>
          </li>
        </ul>
      </nav> 
      
    </div>
  );
};

export default Menu;
