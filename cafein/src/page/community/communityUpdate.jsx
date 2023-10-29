import React, { useState } from 'react'
import axios from 'axios';
import { updateCommunity } from '../API/communityApi';
import {  useNavigate, useParams } from 'react-router-dom';
import {useQuery,useMutation, useQueryClient, QueryClient } from 'react-query'
//update feat
function CommunityWrite() {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const {id} = useParams()
    const navigate=useNavigate()
    const queryClient = useQueryClient();
    console.log("게시물 id:",id)
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleContent = (e) => {
        setBody(e.target.value)
    }
    const updatePost=useMutation((data)=>updateCommunity(id,data.body,data.title),{
      onSuccess: ()=> {
        queryClient.invalidateQueries('communityPosts')
        navigate("/community")
      }
    })
    
    const handleUpdate = async() => {
      if(title&&body){
        updatePost.mutate({body,title})
      }
      //await updateCommunity(id,title,body)
      //navigate("/community")
      

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