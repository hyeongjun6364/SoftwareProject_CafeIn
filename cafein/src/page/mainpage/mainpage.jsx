import React from "react"
import "../../style/mainpage/Slider.scss"
import coffee1 from "./coffee1.jpg"
// import coffee2 from "./핫-카페라떼.jpg"
import starbucks from "./starbucks.jpg"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useState, useEffect } from "react"
import Chatbot from "../API/chatbot.jsx"
import { starbucksState, ediyaState, hollysState, megaState, paikState, allState } from '../Atom/cafeatom';
import { useRecoilState, useRecoilValue } from "recoil"
import "../../style/mainpage/mainpage.scss";
import axios from "axios"
import { useNavigate } from "react-router-dom"
//import getChatGPTResponse from "../API/api.jsx"
const images = [coffee1, starbucks]

function ImageSlider() {
  const settings = {
    dots: true, //동그란 버튼의미
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 자동으로 넘어가는 속도 조정 가능
    cssEase: "linear", // 애니메이션 효과 설정
  }

  return (
    <div style={{ width: "100%", height: "530px" }}>
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className="slider-image">
            <img src={img} alt={`slide${idx}`} style={{ width: "100%" }} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

function Mainpage() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [hollysData, setHollysData] = useRecoilState(hollysState);
  //const hollysData = useRecoilValue(hollysState);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response3 = axios.get("http://localhost:4000/api/cafe/db_get_hollys_menu");
        setHollysData((await response3).data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [])
  const handleClickApiCall = async () => {
    await Chatbot()
  }
  const handleClick = () => {
    setShowChatbot(!showChatbot);
  };
  const handleMonth = (cafename,coffeeId)=>{
    navigate(`/category/${cafename}/${coffeeId}`)
  }
  return (
    <div>
      <ImageSlider />
      <div>
        <h1>이달의 사용자 리뷰 순위</h1>
        <div className="image-container">
          {hollysData.map((tag) => {
            return (
              <div className="image-item" key={tag.id}>
                <img src={tag.image} alt="hollys" onClick={()=>{handleMonth(tag.cafe,tag.beverage)}}/>
                <p>{tag.name}</p>
              </div>
            )
          })}
        </div>


      </div>
      {/* {showChatbot ? <Chatbot /> : <button onClick={handleClick}>Show chatbot</button>} */}
      {/* <button onClick={handleClickApiCall}>GPT API CALL</button> */}
    </div>
  )
}

export default Mainpage
