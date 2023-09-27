import React, { useState } from 'react';
import '../../style/communitypage/community.scss';

function CommunityApp() {
  const [posts, setPosts] = useState([]); // 게시물 목록
  const [newPostText, setNewPostText] = useState(''); // 새 게시물 텍스트

  const handleSubmit= ()=>{
    const timeStamp = new Date().getTime();
    console.log(timeStamp)
    if(newPostText){
      const NewPost = {
        id:timeStamp,
        text:newPostText,
        createdate:new Date(timeStamp).toLocaleString(),
      };
      setPosts([NewPost,...posts]);
      setNewPostText("")
    }
  }
  const handleTextChange = (e) => {
    setNewPostText(e.target.value)
  }
  return (
    <div>
      <h2>커뮤니티</h2>
      <div>
        <textarea
          cols={40}
          rows={10}
          value={newPostText}
          onChange={handleTextChange}
          placeholder='새로운 게시물 작성'
        />

      </div>
      <button onClick={handleSubmit}>제출</button>
    </div>

  )

  // // 새 게시물 작성 핸들러
  // const handleNewPost = () => {
  //   if (newPostText) {
  //     // 현재 시간을 타임스탬프로 생성
  //     const timestamp = new Date().getTime();
  //     const newPost = {
  //       id: timestamp,
  //       text: newPostText,
  //       createdAt: new Date(timestamp).toLocaleString(),
  //     };
  //     setPosts([newPost, ...posts]); // 새 게시물을 목록 맨 위에 추가
  //     setNewPostText(''); // 입력 필드 초기화
  //   }
  // }

  // // 텍스트 입력 변화 핸들러
  // const handleTextChange = (event) => {
  //   setNewPostText(event.target.value);
  // }

  // return (
  //   <div className="community-app">
  //     <h1>커뮤니티 게시판</h1>

  //     {/* 새 게시물 작성 입력 필드 */}
  //     <div>
  //       <textarea
  //         rows="4"
  //         cols="50"
  //         value={newPostText}
  //         onChange={handleTextChange}
  //         placeholder="새로운 게시물 작성..."
  //       />
  //       <br />
  //       <button onClick={handleNewPost}>게시</button>
  //     </div>

  //     {/* 게시물 목록 */}
  //     <div>
  //       <h2>게시물 목록</h2>
  //       <ul>
  //         {posts.map((post) => (
  //           <li key={post.id}>
  //             <p>{post.text}</p>
  //             <small>작성일: {post.createdAt}</small>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // );
}

export default CommunityApp;
