import React, { useState } from 'react'

function CommunityWrite() {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleContent = (e) => {
        setContent(e.target.value)
    }
  return (
    <div className='community-app'>
        <h2>글쓰기</h2>
        <h3>제목</h3>
        <textarea 
        cols={50}
        rows={20}
        value={title}
        onChange={handleTitle}/>
        <h3>내용</h3>
        <textarea 
        cols={50}
        rows={20}
        value={content}
        onChange={handleContent}/>
        
    </div>
    
  )
}

export default CommunityWrite