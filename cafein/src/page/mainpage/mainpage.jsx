import React from "react"
import "../../style/mainpage/Slider.scss"
import coffee1 from "./coffee1.jpg"
// import coffee2 from "./핫-카페라떼.jpg"
import starbucks from "./starbucks.jpg"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useState, useEffect } from "react"
import { starbucksState, ediyaState, hollysState, megaState, paikState, allState } from '../Atom/cafeatom';
import { getPaik,getEdiya,getMega,getHollys,getStarbucks } from "../API/cafeinfo"
import { useRecoilState, useRecoilValue } from "recoil"
import "../../style/mainpage/mainpage.scss";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Widget from '../../common/layout/widget'
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
    <div style={{ width: "100%" }}>
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
  const [reviews,setReviews] = useState([]);
  const [review,setReview] = useState([]);
  const navigate = useNavigate();
  //http://localhost:4000/api/reviews?beverageId=${cafeId}_${coffeeId}
  // 비동기통신을 하기위해 async, await를 useEffect 함수내에서 직접 썻지만
  //  경고 메시지가 나와서 함수를 정의하고 이 함수를 반환하는 식으로 바꿈
  const averageRating = review.length> 0 ? review.reduce((total,post)=>total+post.rating,0)/review.length: 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response1 = await getStarbucks();
        let response2 = await getEdiya()
        let response3 = await getHollys()
        let response4 = await getMega()
        let response5 = await getPaik()
        console.log(response1)
        //let newreview = axios.get("http://localhost:4000/api/reviews?beverageId=")
        // 요청이 완료될때 까지 기다리게 하기위해 Promise 사용 -> 효율성을 위해 병렬로 요청
        const results = await Promise.all([response1, response2, response3, response4, response5]);
        setStarbucksData(response1.data)
        setEdiyaData(response2.data);
        setHollysData(response3.data);
        setMegaData(response4.data);
        setPaikData(response5.data);
        
        
        
        let allData = [];
        //api호출하고받아올때 if문통해서 검사안하면 error남
        results.forEach(result => {
          if (result && result.data){
            allData.push(...result.data);
          }
          
        });
        setEntireData(allData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [])
  //console.log(hollysData)
  
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
