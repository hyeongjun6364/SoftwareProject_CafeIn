import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/common_style/header.scss'

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  // 항목 클릭 시 상태 업데이트
  const handleItemClick = item => {
    setSelectedItem(item);
  };

  return (
    <div>
      <div className="logo" onClick={()=>{
        handleItemClick(null)
      }}>
        <Link to="/">Cafe In</Link>
      </div>
      <nav className="container">
        <ul>
          <li
            className={selectedItem === '홈' ? 'selected' : ''}
            onClick={() => handleItemClick('홈')}
          >
            <Link to="/">목록1</Link>
          </li>
          <div className={`border-bottom ${
                selectedItem === "홈" ? "selected" : ""
              }`}>

          </div>
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
