import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { cafename, coffee } from "./coffeedata"
import coffeeData from "./Data.json"
import "../../style/categorypage/coffeeDetail.scss"
import Review from "./Review"
import axios from "axios"
import EmptyHeart from "../../asset/coffeeDetail/Heart.png"
import FilledHeart from "../../asset/coffeeDetail/FilledHeart.png"
import Starbucks_back from "../../asset/coffeeDetail/starbucks_detail.PNG"
import Ediya_back from "../../asset/coffeeDetail/Ediya_detail.PNG"
import Hollys_back from "../../asset/coffeeDetail/hollys_detail.PNG"
import Paik_back from "../../asset/coffeeDetail/paik_detail.PNG"
import Mega_back from "../../asset/coffeeDetail/mega_detail.PNG"
import FilledStar from "../../asset/coffeeDetail/filled_star.png"
import EmptyStar from "../../asset/coffeeDetail/empty_star.png"
import Like from "../../asset/coffeeDetail/like.png"
import UnLike from "../../asset/coffeeDetail/unlike.png"
import EmptyUnlike from "../../asset/coffeeDetail/emptyUnlike.png"
import FilledUnLike from "../../asset/coffeeDetail/filledUnlike.png"
import { useRecoilState } from "recoil"
import { fetchCoffeeDetail, fetchReview, fetchWishList, PostHeart, PostLike, PostLikeCount, fetchLikeCountAPI } from "../API/coffeeDetail"
function CoffeeDetail() {
  const { cafename, coffeeId, cafeId } = useParams()
  const [posts, setPosts] = useState([])
  const [heart, setHeart] = useState(true)
  const [likeState, setLikeState] = useState(true)
  const [disLikeState, setDisLikeState] = useState(true)
  const [detail, setDetail] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [username, setUsername] = useState([])
  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const navigate = useNavigate()
  //total누적값,
  const averageRating =
    posts.length > 0
      ? posts.reduce((total, post) => total + post.rating, 0) / posts.length
      : 0

  console.log(averageRating)
  const coffeeItem = coffeeData.find(
    (item) => item.cafe === cafename && item.id === parseInt(coffeeId)
  )

  function StarRating({ rating }) {
    return (
      <div>
        {[...Array(5)].map((star, i) => {
          const starValue = i + 1
          return (
            <img
              key={i}
              src={starValue <= rating ? FilledStar : EmptyStar}
              alt="star"
              width={30}
            />
          )
        })}
      </div>
    )
  }
  useEffect(() => {
    if (likeState === false) {
      setDisLikeState(true)
    }

  }, [likeState])
  useEffect(() => {
    if (disLikeState === false) {
      setLikeState(true)
    }

  }, [disLikeState])
  const savedUsername = localStorage.getItem("LS_KEY_USERNAME")
  useEffect(() => {
    if (savedUsername) {
      setUsername(savedUsername)
    }
  }, [])
  useEffect(() => {
    async function fetchData_detail() {

      const detailResponse = await fetchCoffeeDetail(cafename, coffeeId)
      const reviewResponse = await fetchReview(cafeId, coffeeId)
      setDetail(detailResponse.data)
      setPosts(reviewResponse.data)
    }

    const fetchWish = async () => {
      const response = await fetchWishList(savedUsername)
      const productIds = response.data.map((item) => item.productId)
      setWishlist(response.data)
      const currentProductId = `${cafeId}_${coffeeId}`
      console.log("찜:", productIds)
      console.log(username)
      if (productIds.includes(currentProductId)) {
        setHeart(false)
      } else {
        setHeart(true)
      }

    }

    fetchWish()
    fetchData_detail()
    fetchLikeCount()
  }, [heart, likeCount, disLikeCount])
  const detailReview = () => {
    navigate(`/detail/${cafename}/${cafeId}/${coffeeId}`)
  }

  // rating 서버에서 불러와서 비교 후 -> 1,2,3... 순으로 렌더링
  // 각각의 url을 이용해서 하나씩 상태관리 -> setReview에 담고 setReview((pre)=>{new,...Pre})
  //  렌더링 빨라지려면 react-query사용하여 캐싱역할 해야함.
  const handlePostHeart = async () => {
    const response = await PostHeart(savedUsername, cafeId, coffeeId)
    setHeart(!heart)
  }

  const handlePostLike = async () => {
    //const likeboolean= true

    const response = await PostLike(cafeId, coffeeId, true)
    const response2 = await PostLikeCount(cafeId, coffeeId, true)
    setLikeCount(response2.data.likesCount)
    setLikeState(!likeState)
    console.log('likestate:', response.data)
    console.log('likecount:', response2.data)
    //console.log('like boolean:',likeboolean)

  }

  const handlePostDisLike = async () => {
    //const likeboolean= true

    const response = await PostLike(cafeId, coffeeId, false)
    const response2 = await PostLikeCount(cafeId, coffeeId, false)
    setDisLikeCount(response2.data.dislikesCount)
    setDisLikeState(!disLikeState)
    console.log('likestate:', response.data)
    console.log('likecount:', response2.data)
    //console.log('like boolean:',likeboolean)

  }
  
  const fetchLikeCount = async () => {
    try{
      const response = await fetchLikeCountAPI(cafeId, coffeeId)
    setLikeCount(response.data.likesCount);
    setDisLikeCount(response.data.dislikesCount)
    }
    catch(error){
      console.log(error)
    }
    


  }
  if (!detail) {
    return <div>커피를 찾을 수 없습니다.</div>
  }


  return (
    <div>
      <div className="image-container">
        {cafename === "starbucks" ? (
          <>
            <img
              src={Starbucks_back}
              alt="starbucks background image"
              width={"100%"}
              height={"600px"}
              className="starbucks_back"
            />
            <div className="image-text">스타벅스</div>
          </>
        ) : (
          ""
        )}
        <></>
        {cafename === "ediya" ? (
          <>
            <img
              src={Ediya_back}
              alt="starbucks background image"
              width={"100%"}
              height={"600px"}
              className="starbucks_back"
            />
            <div className="image-text">이디야</div>
          </>
        ) : (
          ""
        )}
        {cafename === "hollys" ? (
          <>
            <img
              src={Hollys_back}
              alt="starbucks background image"
              width={"100%"}
              height={"600px"}
              className="starbucks_back"
            />
            <div className="image-text">할리스</div>
          </>
        ) : (
          ""
        )}
        {cafename === "paik" ? (
          <>
            <img
              src={Paik_back}
              alt="starbucks background image"
              width={"100%"}
              height={"600px"}
              className="starbucks_back"
            />
            <div className="image-text">빽다방</div>
          </>
        ) : (
          ""
        )}
        {cafename === "mega" ? (
          <>
            <img
              src={Mega_back}
              alt="starbucks background image"
              width={"100%"}
              height={"600px"}
              className="starbucks_back"
            />
            <div className="image-text">메가커피</div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="coffee-detail-wrapper">
        <img src={detail.image} alt={cafename} className="category-image" />
        <div className="coffee-detail-info">
          <h1 className="coffee-title">{detail.name}</h1>
          <p className="coffee-info">가격: {detail.price}원</p>
          <p className="coffee-info">설명: {detail.content}</p>
          <p className="coffee-info">
            {detail.detail ? (
              <>
                <strong>용량:</strong> {detail.detail.volume}
                <br />
                <strong>칼로리:</strong> {detail.detail.kcal}
                <br />
                <strong>포화 지방산:</strong> {detail.detail.sat_FAT}
                <br />
                <strong>나트륨:</strong> {detail.detail.sodium}
                <br />
                <strong>당류:</strong> {detail.detail.sugars}
                <br />
                <strong>카페인:</strong> {detail.detail.caffeine}
              </>
            ) : (
              "Loading..."
            )}
          </p>
          <br />
          <br />
          <StarRating rating={averageRating} />
          <div className="coffee-heart" onClick={handlePostHeart}>
            찜하기
            <img src={heart ? EmptyHeart : FilledHeart} alt="Empty" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={likeState ? UnLike : Like} alt="like" className="likeImage" onClick={handlePostLike} />
            <img src={disLikeState ? EmptyUnlike : FilledUnLike} alt="like" className="likeImage" onClick={handlePostDisLike} />
            <p>좋아요 수:{`${likeCount}`}</p>
            <p>싫어요 수:{`${disLikeCount}`}</p>
          </div>
        </div>
      </div>
      <br />
      <hr style={{ borderTop: "1px solid gray", margin: "0 10%" }} />
      <ul className="review-ul">
        <div style={{ margin: "0 6%" }}>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Review coffeeId={coffeeId}>이용후기</Review>
            <button onClick={detailReview} className="reviewbutton">
              글쓰기
            </button>
          </div>

          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>내용:{post.content}</p>
              <small>작성자: {post.username}</small>
            </li>
          ))}
        </div>
      </ul>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default CoffeeDetail
