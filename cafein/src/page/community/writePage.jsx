import React, { useState } from 'react'
import axios from 'axios'
const WritePage = (prevpost) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [posts, setPosts] = useState([])
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleContent = (e) => {
        setBody(e.target.value)
    }
    const handleNewPost = () => {
        if (title && body) {
            setPosts(prevpost)
            const newPost = {
                title: title,
                body: body,
                tags: ["태그1", "태그2"],

            }

            try {
                axios.post('http://localhost:4000/api/posts', newPost, {
                    withCredentials: true, // 모든 쿠키 허용
                }

                )

                setPosts([newPost, ...posts])
                setTitle('')
                setBody('')

            } catch (e) {
                console.log(e)
            }
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
                onChange={handleTitle} />
            <h3>내용</h3>
            <textarea
                cols={50}
                rows={20}
                value={body}
                onChange={handleContent} />
            <button onClick={() => handleNewPost()}>제출하기</button>
        </div>
    )
}

export default WritePage