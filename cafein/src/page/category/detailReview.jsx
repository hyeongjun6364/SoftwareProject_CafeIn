import React, { useState } from "react"
import { useParams } from "react-router-dom"
import "../../style/categorypage/review.scss"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"
import Category from "./category"
import { PostReview } from "../API/coffeeDetail"
function DetailReview() {
  const { cafename, cafeId, coffeeId } = useParams()
  const [newheader, setNewheader] = useState([])
  const [newcontent, setNewcontent] = useState([])
  const [newrating, setRating] = useState([])
  const navigate = useNavigate()
  const handleheader = (e) => {
    setNewheader(e.target.value)
  }
  const handlecontent = (value) => {
    setNewcontent(value)
  }
  const handlereview = (e) => {
    setRating(e.target.value)
  }
  const detailpost = () => {
    const plainText = newcontent.replace(/<[^>]+>/g, "")
    const newPost = {
      beverageId: `${cafeId}_${coffeeId}`,
      title: newheader,
      content: plainText,
      rating: newrating,
    }
    if (newcontent || newheader || newrating) {
      PostReview(newPost)
      alert("리뷰가 작성되었습니다.")
      navigate(`/category/${cafename}/${cafeId}/${coffeeId}`)
      
    }
  }
  return (
    <div className="community-app">
      <h2>리뷰 작성하기</h2>
      <h3>제목</h3>
      <input
        type="text"
        className="titleSize"
        placeholder="제목을 작성해주세요"
        onChange={handleheader}
        value={newheader}
      />

      <h3>내용</h3>
      <ReactQuill
        value={newcontent}
        className="contentSize"
        onChange={handlecontent}
        placeholder="내용을 입력해주세요"
      />

      <h3 style={{ marginTop: "100px" }}>별점 매기기</h3>
      <input
        value={newrating}
        onChange={handlereview}
        placeholder="1~5까지 별점매기기"
      />
      <br />
      <br />
      <button onClick={detailpost}>제출하기</button>
    </div>
  )
}

export default DetailReview
