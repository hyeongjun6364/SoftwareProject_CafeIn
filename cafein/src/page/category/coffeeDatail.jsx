import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cafename, coffee } from './coffeedata';
import coffeeData from './Data.json'
import '../../style/categorypage/coffeeDetail.scss'
import Review from './Review';
import axios from 'axios';
import EmptyHeart from '../../asset/coffeeDetail/Heart.png';
import FilledHeart from '../../asset/coffeeDetail/FilledHeart.png';
import Starbucks_back from '../../asset/coffeeDetail/starbucks_detail.PNG'
import Ediya_back from '../../asset/coffeeDetail/Ediya_detail.PNG';
import Hollys_back from '../../asset/coffeeDetail/hollys_detail.PNG';
import Paik_back from '../../asset/coffeeDetail/paik_detail.PNG';
import Mega_back from '../../asset/coffeeDetail/mega_detail.PNG';
import FilledStar from '../../asset/coffeeDetail/filled_star.png';
import EmptyStar from '../../asset/coffeeDetail/empty_star.png';
import { useRecoilState } from 'recoil';
function CoffeeDetail() {
  const { cafename, coffeeId,cafeId } = useParams();
  const [posts, setPosts] = useState([]);
  const [heart, setHeart] = useState(false);
  const [detail, setDetail] = useState([]);
  const navigate = useNavigate();
  //total누적값, 
  const averageRating = posts.length> 0 ? posts.reduce((total,post)=>total+post.rating,0)/posts.length: 0;
  
  console.log(averageRating)
  const coffeeItem = coffeeData.find(
    (item) => item.cafe === cafename && item.id === parseInt(coffeeId)
  );

  //음료 항목 하나 받아올 api 임시 구현 

  function StarRating({ rating }) {
  
    return (
      <div>
        {[...Array(5)].map((star, i) => {
          const starValue = i + 1;
          return (
            <img
              key={i}
              src={starValue <= rating ? FilledStar : EmptyStar}
              alt="star"
              width={30}
            />
          );
        })}
      </div>
    );
  }
  useEffect(() => {
    async function fetchData_detail() {
      try {
        const response = await axios.get(`http://localhost:4000/api/cafe/db_get_${cafename}_menu?beverage=${coffeeId}`)
        setDetail(response.data)
        const response1 = await axios.get(`http://localhost:4000/api/reviews?beverageId=${cafeId}_${coffeeId}`);
        setPosts(response1.data);


      }
      catch (error) {
        console.log(error)
      }


    }
    fetchData_detail();
  }, [])
  const detailReview = ()=>{
   navigate(`/detail/${cafeId}/${coffeeId}`)
  }

  const handleHeart = () => {
    setHeart(!heart);
  }
  if (!detail) {
    return <div>커피를 찾을 수 없습니다.</div>;
  }
  return (
    <div>
      <div className="image-container">
        {cafename === 'starbucks' ?
          <>
            <img src={Starbucks_back} alt="starbucks background image" width={'100%'} height={'600px'} className='starbucks_back' />
            <div className='image-text'>스타벅스</div>
          </>
          : ""}
        <>
        </>
        {cafename === 'ediya' ?
          <>
            <img src={Ediya_back} alt="starbucks background image" width={'100%'} height={'600px'} className='starbucks_back' />
            <div className='image-text'>이디야</div>
          </>
          : ""}
        {cafename === 'hollys' ?
          <>
            <img src={Hollys_back} alt="starbucks background image" width={'100%'} height={'600px'} className='starbucks_back' />
            <div className='image-text'>할리스</div>
          </>
          : ""}
        {cafename === 'paik' ?
          <>
            <img src={Paik_back} alt="starbucks background image" width={'100%'} height={'600px'} className='starbucks_back' />
            <div className='image-text'>빽다방</div>
          </>
          : ""}
        {cafename === 'mega' ?
          <>
            <img src={Mega_back} alt="starbucks background image" width={'100%'} height={'600px'} className='starbucks_back' />
            <div className='image-text'>메가커피</div>
          </>
          : ""}

      </div>
      <div className="coffee-detail-wrapper">
        <img src={detail.image} alt={cafename} className="category-image" />
        <div className='coffee-detail-info'>
          <h1 className="coffee-title">{detail.name}</h1>
          <p className="coffee-info">가격: {detail.price}원</p>

          <p className="coffee-info">설명: {detail.content}</p>
          <p className="coffee-info">
            {detail.detail ? (
              <>
                용량: {detail.detail.volume}<br />
                칼로리: {detail.detail.kcal}<br />
                포화 지방산: {detail.detail.sat_FAT}<br />
                나트륨: {detail.detail.sodium}<br />
                당류: {detail.detail.sugars}<br />
                카페인: {detail.detail.caffeine}
              </>
            ) : 'Loading...'}

          </p>
          <br />
          <br />
          <StarRating rating={averageRating} />
          <div className='coffee-heart' onClick={handleHeart}>찜하기
            <img src={heart ? EmptyHeart : FilledHeart} alt='Empty' />
          </div>
        </div>
      </div>
      <br />
      <hr style={{ borderTop: "1px solid gray", margin: "0 5%" }} />
      <Review coffeeId={coffeeId}>이용후기</Review>
      <button onClick={detailReview}>글쓰기</button>
      <ul className='review-ul'>
        {posts.map((post => (
          <li key={post.id} >
            <h3>{post.title}</h3>
            <p>내용:{post.content}</p>
            <small>작성자: {post.username}</small>
          </li>

        )))}

      </ul>
    </div>
  )
}

export default CoffeeDetail
