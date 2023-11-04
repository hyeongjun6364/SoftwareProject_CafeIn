import React, { useState, useEffect } from "react"
import "../../style/mypage/login.scss"
import Login from "./login"
import { useRecoilState } from "recoil"
import { loggedInState } from "./auth"
import axios from "axios"

const MyPage = () => {
  const [isLogged, setIsLogged] = useRecoilState(loggedInState)
  const [taste, setTaste] = useState([]) // 취향 정보를 저장할 상태
  const [wishCafeInfo, setWishCafeInfo] = useState([]);
  const storedUsername = localStorage.getItem("LS_KEY_USERNAME")

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("login")
    if (storedLoginStatus === "true") {
      setIsLogged(true)
      // 로그인한 경우, 취향 정보를 가져오는 API 호출
      axios
        .get("/api/auth/register/answer")
        .then((response) => {
          setTaste(response.data) // 취향 정보를 설정
        })
        .catch((error) => {
          console.error("취향 정보를 불러오는 중 오류 발생:", error)
        })
    }
  }, [isLogged])

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
  const savedUsername = localStorage.getItem("LS_KEY_USERNAME")
  useEffect(()=>{
    const fetchWish = async () =>{
      try{
        const response = await axios.get(`http://localhost:4000/api/wishlist/${savedUsername}`);
        const wishList = response.data.map((wish)=>wish.productId)
        console.log(wishList)
        //정규식을 이용하여 cafeid , beverageid 추출
        const wishCafe = wishList.map((wish) => {
          if (typeof wish === 'string') {
            const matches = wish.match(/^(\d+)_(\d+)$/); 
            if (matches && matches.length > 2) {
              const cafeId = matches[1];
              const beverageId = matches[2];
              if (cafeId==='1'){
                const cafename= 'starbucks'
                return {cafeId, cafename,beverageId};
              }
              else if (cafeId==='2'){
                const cafename= 'ediya'
                return {cafeId, cafename,beverageId};
              }
              else if (cafeId==='3'){
                const cafename= 'hollys'
                return {cafeId, cafename,beverageId};
              }
              else if (cafeId==='4'){
                const cafename= 'paik'
                return {cafeId, cafename,beverageId};
              }
              else if (cafeId==='5'){
                const cafename= 'mega'
                return {cafeId, cafename,beverageId};
              }
               //객체 형식으로 반환
            }
          }
          return null; 
        }).filter(Boolean);//null이나 undefined요소 제거
        console.log("cafeid",wishCafe)
        const wishCafeResponses = await Promise.all(wishCafe.map(async ({cafename, beverageId}) => {
          if (cafename && beverageId) { // cafename과 beverageId가 존재하는 경우에만 API 호출
            return fetchCafeWishList(cafename, beverageId);
          }
        }));
  
        setWishCafeInfo(wishCafeResponses.map(response => response.data));
      }
      catch(error){
        console.log(error)
      }
      
      
    }
    fetchWish()
  },[])
  
  const fetchCafeWishList = async(cafename,coffeeId) => {

    try{
      const response = await axios.get(`http://localhost:4000/api/cafe/db_get_${cafename}_menu?beverage=${coffeeId}`)
      //console.log(response.data)
      
      return response
    }
    catch(error){
      console.log(error)
    }
    
  }
  console.log("wishCAfeInfo:",wishCafeInfo)
  // if (answer === '피곤한데... 커피!') {
  //   return 'coffee';
  // } else if (answer === '맛있는 음료가 좋아') {
  //   return 'non-coffee';
  // }

  // if (answer === '아메리카노') {
  //   return 'americano';
  // } else if (answer === '라뗴') {
  //   return 'latte';
  // } else if (answer === '에이드') {
  //   return 'ade';
  // } else if (answer === '주스') {
  //   return 'juice';
  // } else if (answer === '티') {
  //   return 'tea';
  // }

  // if (answer === '콜라도 제로로 먹는데?') {
  //   return 'k_low';
  // } else if (answer === '그래도 칼로리는 칼로리지') {
  //   return 'k_mid';
  // } else if (answer === '맛있으면 0칼로리!') {
  //   return 'k_high';
  // }

  // if (answer === '아이스') {
  //   return 'ice';
  // } else if (answer === '핫') {
  //   return 'hot';
  // }

  // if (answer === '아니 별로...') {
  //   return 'p_low';
  // } else if (answer === '적당한게 좋아') {
  //   return 'p_mid';
  // } else if (answer === '단게 땡긴다!!') {
  //   return 'p_high';
  // }

  // if (answer === '텅장이다 ㅠ') {
  //   return 'p_low';
  // } else if (answer === 'soso') {
  //   return 'p_mid';
  // } else if (answer === '사치 좀 부려봐?') {
  //   return 'p_high';
  // }

  const mapTasteToDescription = (taste) => {
    switch (taste) {
      case "coffee":
        return "커피 vs 음료: 커피"
      case "non-coffee":
        return "커피 vs 음료: 음료"

      case "americano":
        return "좋아하는 커피 또는 음료: 아메리카노"
      case "latte":
        return "좋아하는 커피 또는 음료: 라떼"
      case "ade":
        return "좋아하는 커피 또는 음료: 에이드"
      case "juice":
        return "좋아하는 커피 또는 음료: 주스"
      case "tea":
        return "좋아하는 커피 또는 음료: 티"

      case "k_low":
        return "칼로리: 낮음(100kcal 이하)"
      case "k_mid":
        return "칼로리: 중간(100 ~ 250kcal)"
      case "k_high":
        return "칼로리: 높음(250kcal 이상)"

      case "ice":
        return "온도: 아이스"
      case "hot":
        return "온도: 핫"

      case "s_low":
        return "당도: 중간(10g 이하)"
      case "s_mid":
        return "당도: 중간(10 ~ 25g)"
      case "s_high":
        return "당도: 높음(25g 이상)"

      case "p_low":
        return "가격: 싼 편(3000원 이하)"
      case "p_mid":
        return "가격: 중간(3000 ~ 5000원)"
      case "p_high":
        return "가격: 비싼 편(6500원 이상)"

      default:
        return taste // 다른 경우 그대로 표시
    }
  }

  return (
    <div className="mypage-container">
      {isLogged ? (
        <div className="mypage-content">
          <h2 className="welcome-text">환영합니다!</h2>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <h2 className="welcome-text">
            {storedUsername
              ? storedUsername.substring(1, storedUsername.length - 1)
              : ""}
            님
          </h2>
          <button onClick={handleLogout}>로그아웃</button>
          </div>
          
          <h3>나의 cafein 추천 음료 취향</h3>

          <ul className="custom">
            {taste.map((item, index) => (
              <li key={index} className="taste-item">
                {mapTasteToDescription(item)}
              </li>
            ))}
          </ul>
          <h3>찜한음료</h3>
          {wishCafeInfo.map((info, index) => (
              <div >
                <img src={info.image} alt={info.name}/>
                <p>{info.name}</p>
              </div>
            ))}
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default MyPage
