import React, { useState } from 'react'
import axios from 'axios';
import { updateCommunity } from '../API/communityApi';
import {  useNavigate, useParams } from 'react-router-dom';
import {useQuery,useMutation, useQueryClient, QueryClient } from 'react-query'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 스타일을 불러옵니다.
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
    const handleContent = (content) => {
      setBody(content)
    }
    const updatePost=useMutation((data)=>updateCommunity(id,data.title,data.body,),{
      onSuccess: ()=> {
        queryClient.invalidateQueries('communityPosts')
        navigate("/community")
      }
    })
    
    const handleUpdate = () => {
      if(title&&body){
        const plainText = body.replace(/<[^>]+>/g, '');
        updatePost.mutate({title:title,body:plainText})
      }
    }
    console.log(body)
  return (
    <div className='community-app'>
        <h2>글 수정하기</h2>
        <h3>제목</h3>
        <input type='text'
        className='titleSize'
         value={title} onChange={handleTitle}/>
        
        <h3>내용</h3>
        <ReactQuill 
                value={body}
                onChange={handleContent}
                className='contentSize'
            />
        <button onClick={() => handleUpdate()} style={{marginTop:'70px'}}>제출하기</button>
    </div>
    
  )
}

export default CommunityWrite