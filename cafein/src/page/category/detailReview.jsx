import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import "../../style/categorypage/review.scss";
import axios from 'axios';
function DetailReview() {
    const {cafeId,coffeeId} = useParams();
    const [newheader,setNewheader] = useState([]);
    const [newcontent,setNewcontent] = useState([]);
    const [newrating,setRating] = useState([]);
   //http://localhost:4000/api/reviews?beverageId=2_71 GET 방식
   //http://localhost:4000/api/reviews Post 방식
    const handleheader = (e) =>{
        setNewheader(e.target.value)
    }
    const handlecontent = (e) =>{
        setNewcontent(e.target.value)
    }
    const handlereview = (e) =>{
        setRating(e.target.value)
    }
    const detailpost=()=>{
        const newPost = {
            beverageId:`${cafeId}_${coffeeId}`,
            title: newheader,
            content: newcontent,
            rating: newrating,
          }
        if(newcontent||newheader||newrating){
            try{
                axios.post("http://localhost:4000/api/reviews",newPost,{
                    withCredentials: true,
                })

                alert("리뷰가 작성되었습니다.")
            }
            catch(error){
                console.log(error)
                alert("에러발생")
            }
            
        }
       
    }
  return (
    <div className='community-app'>
        <h2>리뷰 작성하기</h2>
        <h3>제목</h3>
        <textarea 
        cols={30} 
        rows={10} 
        value={newheader}
        onChange={handleheader}
        placeholder='제목을 작성해주세요'/>

        <h3>내용</h3>
        <textarea 
        cols={30} 
        rows={10} 
        value={newcontent}
        onChange={handlecontent}
        placeholder='내용을 작성해주세요'/>
        <h3>별점 매기기</h3>
        <input value={newrating} onChange={handlereview} placeholder='1~5까지 별점매기기'/>
        <br/>
        <br/>
        <button onClick={detailpost}>제출하기</button>
    </div>
  )
}

export default DetailReview