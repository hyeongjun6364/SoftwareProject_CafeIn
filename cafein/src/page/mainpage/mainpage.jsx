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
  const [starbucksData, setStarbucksData] = useRecoilState(starbucksState);
  const [ediyaData, setEdiyaData] = useRecoilState(ediyaState);
  const [hollysData, setHollysData] = useRecoilState(hollysState);
  const [megaData, setMegaData] = useRecoilState(megaState);
  const [paikData, setPaikData] = useRecoilState(paikState);
  const [entireData, setEntireData] = useRecoilState(allState);

  const navigate = useNavigate();
  
  // 비동기통신을 하기위해 async, await를 useEffect 함수내에서 직접 썻지만
  //  경고 메시지가 나와서 함수를 정의하고 이 함수를 반환하는 식으로 바꿈
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response1 = axios.get("http://localhost:4000/api/cafe/db_get_starbucks_menu");
        let response2 = axios.get("http://localhost:4000/api/cafe/db_get_ediya_menu");
        let response3 = axios.get("http://localhost:4000/api/cafe/db_get_hollys_menu");
        let response4 = axios.get("http://localhost:4000/api/cafe/db_get_mega_menu")
        let response5 = axios.get("http://localhost:4000/api/cafe/db_get_paik_menu")
        // 요청이 완료될때 까지 기다리게 하기위해 Promise 사용 -> 효율성을 위해 병렬로 요청
        const results = await Promise.all([response1, response2, response3, response4, response5]);
        setStarbucksData((await response1).data)
        setEdiyaData((await response2).data);
        setHollysData((await response3).data);
        setMegaData((await response4).data);
        setPaikData((await response5).data);


        let allData = [];

        results.forEach(result => {
          allData.push(...result.data);
        });


        setEntireData(allData);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [])
  console.log(hollysData)
  const handleClickApiCall = async () => {
    await Chatbot()
  }
  const handleClick = () => {
    setShowChatbot(!showChatbot);
  };
  const handleMonth = (cafename,coffeeId,cafeId)=>{
    navigate(`/category/${cafename}/${cafeId}/${coffeeId}`)
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
                <img src={tag.image} alt="hollys" onClick={()=>{handleMonth(tag.cafe,tag.beverage,tag.cafeid)}}/>
                <p>{tag.name}</p>
              </div>
            )
          })}
        </div>


      </div>
      
    </div>
  )
}

export default Mainpage
