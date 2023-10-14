// import React, { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { cafename, coffee } from "./coffeedata"
// import coffeeData from "./Data.json"
// import "../../style/categorypage/coffeeDetail.scss"
// import Review from "./Review"
// import axios from "axios"
// import EmptyHeart from "../../asset/coffeeDetail/Heart.png"
// import FilledHeart from "../../asset/coffeeDetail/FilledHeart.png"
// function CoffeeDetail() {
//   const { cafename, coffeeId } = useParams()
//   const [posts, setPosts] = useState([])
//   const [newPost, setNewposts] = useState()
//   const [heart, setHeart] = useState(false)
//   const coffeeItem = coffeeData.find(
//     (item) => item.cafe === cafename && item.id === parseInt(coffeeId)
//   )
//   // 실제 우리 db서버
//   //http://localhost:4000/api/posts?username=&tag&page=1
//   // 무료 api 서버
//   //https://jsonplaceholder.typicode.com/posts
//   useEffect(() => {
//     async function fetchdata() {
//       try {
//         const response = await axios.get(
//           "https://jsonplaceholder.typicode.com/posts"
//         )
//         setPosts(response.data)
//       } catch (e) {
//         console.error(e)
//       }
//     }
//     fetchdata()
//   }, [])

//   const handleHeart = () => {
//     setHeart(!heart)
//   }
//   if (!coffeeItem) {
//     return <div>커피를 찾을 수 없습니다.</div>
//   }
//   return (
//     <div>
//       <div className="coffee-detail-wrapper">
//         <img src={coffeeItem.image} alt={cafename} className="category-image" />
//         <div className="coffee-detail-info">
//           <h1 className="coffee-title">{coffeeItem.name}</h1>
//           <p className="coffee-info">가격: {coffeeItem.price}원</p>

//           <p className="coffee-info">설명: {coffeeItem.description}</p>
//           <br />
//           <br />
//           <div className="coffee-heart" onClick={handleHeart}>
//             찜하기
//             <img src={heart ? EmptyHeart : FilledHeart} alt="Empty" />
//           </div>
//         </div>
//       </div>
//       <Review coffeeId={coffeeId}>이용후기</Review>
//       <ul className="review-ul">
//         {posts.map((post) => (
//           <li key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.body}</p>
//             <small>작성자: {post.userId}</small>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default CoffeeDetail

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import EmptyHeart from "../../asset/coffeeDetail/Heart.png"
import FilledHeart from "../../asset/coffeeDetail/FilledHeart.png"

function CoffeeDetail() {
  const { cafename, coffeeId, cafe_api } = useParams()
  const [coffeeItem, setCoffeeItem] = useState(null)
  const [heart, setHeart] = useState(false)

  useEffect(() => {
    async function fetchCoffeeData() {
      try {
        const response = await axios.get(`/api/cafe/${cafename}/${coffeeId}`)
        setCoffeeItem(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCoffeeData()
  }, [cafename, coffeeId])

  const handleHeart = () => {
    setHeart(!heart)
  }

  if (!coffeeItem) {
    return <div>커피를 찾을 수 없습니다.</div>
  }

  return (
    <div>
      <div className="coffee-detail-wrapper">
        <img src={coffeeItem.image} alt={cafename} className="category-image" />
        <div className="coffee-detail-info">
          <h1 className="coffee-title">{coffeeItem.name}</h1>
          <p className="coffee-info">가격: {coffeeItem.price}원</p>
          <p className="coffee-info">설명: {coffeeItem.description}</p>
          <br />
          <br />
          <div className="coffee-heart" onClick={handleHeart}>
            찜하기
            <img src={heart ? EmptyHeart : FilledHeart} alt="Empty" />
          </div>
        </div>
      </div>
      {/* 추가적인 리뷰 섹션을 여기에 추가하세요 */}
    </div>
  )
}

export default CoffeeDetail
