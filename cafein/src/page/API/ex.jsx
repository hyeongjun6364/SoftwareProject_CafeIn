import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Apiex() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // 데이터를 불러오는 Axios 요청을 보냅니다.
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleAddPost = () => {
    if (newPost) {
      const newPostObj = {
        title: newPost,
        body: newPost,
        userId: 1, // 임의의 사용자 ID
        id: posts.length + 1, // 임의의 고유 ID
      };

      // 새로운 글을 추가하는 Axios 요청을 보냅니다.
      axios.post('https://jsonplaceholder.typicode.com/posts', newPostObj)
        .then((response) => {
          setPosts([response.data,...posts]);
          setNewPost('');
        })
        .catch((error) => {
          console.error('Error adding post:', error);
        });
    }
  };

  const handleDeletePost = (postId) => {
    // 글을 삭제하는 Axios 요청을 보냅니다.
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div>
      <h1>게시판</h1>
      <div>
        <input
          type="text"
          placeholder="새로운 글 작성"
          value={newPost}
          onChange={handleInputChange}
        />
        <button onClick={handleAddPost}>추가</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
            <button onClick={() => handleDeletePost(post.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Apiex;
