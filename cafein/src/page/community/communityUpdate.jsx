import React, { useState } from 'react'
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';
//update feat
function CommunityWrite() {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const {id} = useParams()
    const navigate=useNavigate()
    console.log("게시물 id:",id)
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleContent = (e) => {
        setBody(e.target.value)
    }

    
    const handleUpdate = async() => {
      try {
        await axios.patch(`http://localhost:4000/api/posts/${id}`, {title,body},{
          withCredentials: true,
        })
        alert("게시물이 성공적으로 수정되었습니다.")
        navigate('/community')
      }
      catch(error){
        if(title=='' || body==''){
          alert('게시물 작성 바람.')
        }
        else{
          alert('게시물 작성 실패')
        }
        console.error(error);
        
      }

    }
    
  return (
    <div className='community-app'>
        <h2>글 수정하기</h2>
        <h3>제목</h3>
        <textarea 
        cols={50}
        rows={7}
        value={title}
        onChange={handleTitle}/>
        <h3>내용</h3>
        <textarea 
        cols={50}
        rows={20}
        value={body}
        onChange={handleContent}/>
        <button onClick={() => handleUpdate()}>제출하기</button>
    </div>
    
  )
}

export default CommunityWrite