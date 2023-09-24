import React, { useState, useEffect } from 'react'
import '../style/mainpage/Slider.scss'
import coffee1 from './coffee1.jpg';
import coffee2 from './핫-카페라떼.jpg'
import starbucks from './starbucks.jpg'
import Header from '../common/header.jsx'
import Footer from '../common/footer.jsx';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  coffee1,
  starbucks,
  // 여기에 더 많은 이미지 URL을 추가할 수 있습니다.
];

function ImageSlider() {
  const settings = {
    dots: true,//동그란 버튼의미
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 자동으로 넘어가는 속도 조정 가능
    cssEase: "linear" // 애니메이션 효과 설정
  };

  return (
    <div style={{ width: '100%' }}>
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className="slider-image">
            <img src={img} alt={`slide${idx}`} style={{ width: '100%' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function mainpage() {


  return (
    <div>
      <Header />
      <ImageSlider />
      <br/>
      사용자 음료 추천
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      
      <Footer />
    </div>
  )
}

export default mainpage
