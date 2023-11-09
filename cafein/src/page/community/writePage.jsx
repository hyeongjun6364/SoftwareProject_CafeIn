
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCommunity } from '../API/communityApi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 스타일을 불러옵니다.
import {useQuery,useMutation, useQueryClient, QueryClient } from 'react-query'
const WritePage = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleContent = (content) => {
        setBody(content);

    }
    const createPostMutation = useMutation(postCommunity,{
        onSuccess: () => {
          queryClient.invalidateQueries("communityPosts")
         
          navigate('/community')
          alert("글이 작성되었습니다")
        }
      })
    const handleNewPost = async () => {
        
        if (title && body) {
            const plainText = body.replace(/<[^>]+>/g, '');
            createPostMutation.mutate({
              title: title,
              body: plainText,
              tags: ["태그1", "태그2"],
            });
          }
    }

    return (
        <div className='community-app'>
            <h2>글 쓰기</h2>
            <h3>제목</h3>
            <input 
                type="text"
                value={title}
                onChange={handleTitle}
            />
            <h3>내용</h3>
            <ReactQuill 
                value={body}
                onChange={handleContent}
                style={{height:'300px'}}
            />
            <button onClick={handleNewPost} style={{marginTop:'90px'}}>제출하기</button>
        </div>
    )
}

export default WritePage;
