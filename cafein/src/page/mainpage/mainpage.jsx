import React from "react"
import "../../style/mainpage/Slider.scss"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useState, useEffect } from "react"
import { starbucksState, ediyaState, hollysState, megaState, paikState, allState } from '../Atom/cafeatom';
import { currentRecommendState, recommendState } from "../Atom/recommend"
import { getPaik, getEdiya, getMega, getHollys, getStarbucks } from "../API/cafeinfo"
import { getRecommendApi } from "../API/recommendApi"
import { tasteInfoApi } from "../API/tasteInfo"
import { useRecoilState, useRecoilValue } from "recoil"
import ImageSlider from "./imageSlider"
import "../../style/mainpage/mainpage.scss";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Widget from '../../common/layout/widget'

function Mainpage() {
  const [starbucksData, setStarbucksData] = useRecoilState(starbucksState);
  const [ediyaData, setEdiyaData] = useRecoilState(ediyaState);
  const [hollysData, setHollysData] = useRecoilState(hollysState);
  const [megaData, setMegaData] = useRecoilState(megaState);
  const [paikData, setPaikData] = useRecoilState(paikState);
  const [entireData, setEntireData] = useRecoilState(allState);
  const [allrecommend,setAllRecommend] = useRecoilState(recommendState);
  const [myTaste, setMyTaste] = useState([])
  const [review, setReview] = useState([]);
  const [currentRecommend,setCurrentRecommend] = useRecoilState(currentRecommendState)
 
  const navigate = useNavigate();
  //http://localhost:4000/api/reviews?beverageId=${cafeId}_${coffeeId}
  // 비동기통신을 하기위해 async, await를 useEffect 함수내에서 직접 썻지만
  //  경고 메시지가 나와서 함수를 정의하고 이 함수를 반환하는 식으로 바꿈
  const storedUsername = localStorage.getItem("LS_KEY_USERNAME")
  const userRecommend= entireData.filter((drink)=>{
    const data = myTaste.filter((info)=>{ return drink.tag.includes(info)})
    return data.length >= 4
  })
  console.log(userRecommend)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response1 = await getStarbucks();
        let response2 = await getEdiya()
        let response3 = await getHollys()
        let response4 = await getMega()
        let response5 = await getPaik()
        let response6 = await tasteInfoApi()
        let response_recommend = await getRecommendApi()
        //let newreview = axios.get("http://localhost:4000/api/reviews?beverageId=")
        // 요청이 완료될때 까지 기다리게 하기위해 Promise 사용 -> 효율성을 위해 병렬로 요청
        const results = await Promise.all([response1, response2, response3, response4, response5]);
        setStarbucksData(response1.data)
        setEdiyaData(response2.data);
        setHollysData(response3.data);
        setMegaData(response4.data);
        setPaikData(response5.data);
        setMyTaste(response6.data)
        setAllRecommend(response_recommend.data)
        let allData = [];
        //api호출하고받아올때 if문통해서 검사안하면 error남
        results.forEach(result => {
          if (result && result.data) {
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
  console.log("myTaste", myTaste)
  console.log('recommend',allrecommend)
  useEffect(() => {
    console.log("currentRecommend", currentRecommend);
  }, [currentRecommend]);
  const handleMonth = (cafename, coffeeId, cafeId) => {
    const current=allrecommend.filter((tag)=>tag.Selected===`${cafeId}_${coffeeId}`)
    console.log("current ",current)
    setCurrentRecommend(current)
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
                <img src={tag.image} alt="hollys" onClick={() => { handleMonth(tag.cafe, tag.beverage, tag.cafeid) }} />
                <p>{tag.name}</p>
              </div>
            )
          })}
        </div>
        <h1>{`${storedUsername}`}님 추천 음료</h1>

        <div className="image-container">
          {userRecommend
            .map((filteredDrink) => (
              <div className="image-item" key={filteredDrink.id}>
                <img src={filteredDrink.image} alt={filteredDrink.name} onClick={() => handleMonth(filteredDrink.cafe, filteredDrink.beverage, filteredDrink.cafeid)} />
                <p>{filteredDrink.name}</p>
                
              </div>

            ))}
        </div>
        <h1>맞춤추천음료</h1>
        <div className="image-container">
        {currentRecommend.map((item, index) => (
          <div className="image-item" key={index}>
            <p>{item.recommend}</p>
          </div>
        ))}
      </div>
        <br />
        <br />
        <br />
        <br />
      </div>

    </div>
  )
}

export default Mainpage
