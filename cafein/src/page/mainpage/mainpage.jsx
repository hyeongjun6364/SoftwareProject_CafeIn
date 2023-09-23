import React from "react"
import "../../style/mainpage/Slider.scss"
import coffee1 from "./coffee1.jpg"
// import coffee2 from "./핫-카페라떼.jpg"
import starbucks from "./starbucks.jpg"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useState } from "react"
import getChatGPTResponse from "../API/api.jsx"
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
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAskQuestion = async () => {
    if (question.trim() === "") return;

    // ChatGPT API를 호출하여 질문에 대한 답변을 가져옵니다.
    const response = await getChatGPTResponse(question);
    setAnswer(response);
  };
  return (
    <div>
      <ImageSlider />
      <div>
        <input
          type="text"
          placeholder="질문을 입력하세요."
          value={question}
          onChange={handleQuestionChange}
        />
        <button onClick={handleAskQuestion}>질문하기</button>
      </div>
      <div>
        {answer && <p>답변: {answer}</p>}
      </div>
    </div>
  )
}

export default Mainpage
