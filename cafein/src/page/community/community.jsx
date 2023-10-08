import React, { useEffect, useState } from 'react';
import '../../style/communitypage/community.scss';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import '../../style/categorypage/pagination.scss'
function CommunityApp() {
  const [posts, setPosts] = useState([]); // 게시물 목록
  const [newPostText, setNewPostText] = useState(''); // 새 게시물 텍스트
  const [activePage, setActivePage] = useState(1); // 현재 페이지
  const postsPerPage = 10; // 페이지당 표시할 게시물 수

  // const handleSubmit = () => {
  //   const timeStamp = new Date().getTime();
  //   console.log(timeStamp)
  //   if (newPostText) {
  //     const NewPost = {
  //       id: timeStamp,
  //       text: newPostText,
  //       createdate: new Date(timeStamp).toLocaleString(),
  //     };
  //     setPosts([NewPost, ...posts]);//post앞에 newpost추가
  //     setNewPostText("")
  //   }
  // }
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const handleTextChange = (e) => {
    setNewPostText(e.target.value)
  }
  // READ data
  useEffect(() => {
    async function CommunityFetch() {
      try {
        const response = await axios.get('http://localhost:4000/api/posts?username=&tag&page=1')
        setPosts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    CommunityFetch()
  }, [])



  // write post
  const handleNewPost = () => {
    if (newPostText) {
      const newPost = {
        title: newPostText,
        body: newPostText,
        tags: ["태그1", "태그2"],
        
        //userId: 1,
        //id: posts.length + 1,
      }
      //console.log(newPost.user._id)
      try {
        axios.post('http://localhost:4000/api/posts', newPost
        )
        
        setPosts([newPost, ...posts])
        setNewPostText('')

      } catch (e) {
        console.log(e)
      }
    }
  }


  // function getCookie(cookieName) {
  //   cookieName = `${cookieName}=`;
  //   let cookieData = document.cookie;
  
  //   let cookieValue = "";
  //   let start = cookieData.indexOf(cookieName);
  
  //   if (start !== -1) {
  //     start += cookieName.length;
  //     let end = cookieData.indexOf(";", start);
  //     if (end === -1) end = cookieData.length;
  //     cookieValue = cookieData.substring(start, end);
  //   }
    
  //   return unescape(cookieValue);
  // }

  //delete post
  const handleDeletePost = (id) => {

    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        const updatedPost = posts.filter((post) => post.id !== id)
        setPosts(updatedPost)
      })
      .catch((error) => {
        console.error(error);
      });

  }
  const indexOfLastPost = activePage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className='community-app'>
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
      <button onClick={handleNewPost}>제출</button>
      <div>
        <h2>게시물 목록</h2>
        <ul>
          {currentPosts.map((post => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <small>작성자: {post.user?post.user.username :"none"}</small>
              <button onClick={() => handleDeletePost(post._id)}>삭제</button>
            </li>

          )))}

        </ul>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={postsPerPage}
          totalItemsCount={posts.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
        <br />
        <br />
      </div>
    </div>

  )

}

export default CommunityApp;
