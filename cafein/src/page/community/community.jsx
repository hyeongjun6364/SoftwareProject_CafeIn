import React, { useEffect, useState } from 'react';
import '../../style/communitypage/community.scss';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import '../../style/categorypage/pagination.scss';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function CommunityApp() {
  const [posts, setPosts] = useState([]); // 게시물 목록
  const [newPostText, setNewPostText] = useState(''); // 새 게시물 텍스트
  const [activePage, setActivePage] = useState(1); // 현재 페이지
  const postsPerPage = 10; // 페이지당 표시할 게시물 수
  const navigate = useNavigate();

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
        const response = await axios.get("http://localhost:4000/api/posts?username=&tag&page=")
        setPosts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    CommunityFetch()
  }, [posts])



  // write post
  const handleNewPost = () => {
    if (newPostText) {
      const newPost = {
        title: newPostText,
        body: newPostText,
        tags: ["태그1", "태그2"],
        
      }
      
      try {
        axios.post('http://localhost:4000/api/posts', newPost,  {
          withCredentials: true, // 모든 쿠키 허용
        }

        )
        
        setPosts([newPost, ...posts])
        setNewPostText('')

      } catch (e) {
        console.log(e)
      }
    }
  }


  //delete post
  

  const handleDeletePost = (id) => {
    const token = Cookies.get('access_token');

    axios.delete(`http://localhost:4000/api/posts/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true, // 모든 쿠키 허용
    })
      .then(() => {
        const updatedPost = posts.filter((post) => post.id !== id)
        setPosts(updatedPost)
        alert('글이 삭제되었습니다')
      })
      .catch((error) => {
        alert('해당작성자만 삭제 가능')
        console.error(error);
      });

  }

  // update post

  const handleUpdatepost = async(id) => {
    await axios.patch(`http://localhost:4000/api/posts/${id}`)
  }
  const indexOfLastPost = activePage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


  // 글쓰기
  const handlewrite =() => {
    navigate('/write')
  }
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
        <div style={{display:'flex',alignContent:'center',}}>
        <h2>게시물 목록</h2>
        <button onClick={handlewrite}>글쓰기</button>
        </div>
        
        <ul>
          {currentPosts.map((post => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <small>작성자: {post.user?post.user.username :"none"}</small>
              <button onClick={() => handleDeletePost(post._id)}>삭제</button>
              <button onClick={() => handleUpdatepost(post._id)}>수정</button>
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
