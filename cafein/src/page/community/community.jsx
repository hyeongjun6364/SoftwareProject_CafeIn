import React, { useEffect, useState } from "react"
import "../../style/communitypage/community.scss"
import axios from "axios"
import Pagination from "react-js-pagination"
import "../../style/categorypage/pagination.scss"
function CommunityApp() {
  const [posts, setPosts] = useState([]) // 게시물 목록
  const [newPostText, setNewPostText] = useState("") // 새 게시물 텍스트
  const [activePage, setActivePage] = useState(1) // 현재 페이지
  const postsPerPage = 10 // 페이지당 표시할 게시물 수

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
    setActivePage(pageNumber)
  }
  const handleTextChange = (e) => {
    setNewPostText(e.target.value)
  }
  // READ data
  useEffect(() => {
    async function CommunityFetch() {
      try {
        // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        const response = await axios.get("http://localhost:4000/api/posts")
        setPosts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    CommunityFetch()
  }, [])

  // write post
  const handleNewPost = async () => {
    if (newPostText) {
      const newPost = {
        title: newPostText,
        body: newPostText,
        tags: [], // 태그 데이터 추가 (필요에 따라 태그 목록을 클라이언트에서 설정)
        // id: posts.length + 1,
      }

      try {
        // axios.post("https://jsonplaceholder.typicode.com/posts", newPost)
        const response = await axios.post(
          "http://localhost:4000/api/posts",
          newPost,
          {
            withCredentials: true, // withCredentials: true를 추가합니다.
          }
        )
        setPosts([newPost, ...posts])
        setNewPostText("")
      } catch (e) {
        console.log(e)
      }
    }
  }

  //delete post
  const handleDeletePost = (id) => {
    axios
      // .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .delete(`http://localhost:4000/api/posts/${id}`)
      .then(() => {
        const updatedPost = posts.filter((post) => post.id !== id)
        setPosts(updatedPost)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const indexOfLastPost = activePage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <div className="community-app">
      <h2>커뮤니티</h2>
      <div>
        <textarea
          cols={40}
          rows={10}
          value={newPostText}
          onChange={handleTextChange}
          placeholder="새로운 게시물 작성"
        />
      </div>
      <button onClick={handleNewPost}>제출</button>
      <div>
        <h2>게시물 목록</h2>
        <ul>
          {currentPosts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <small>작성자: {post.userId}</small>
              <button onClick={() => handleDeletePost(post.id)}>삭제</button>
            </li>
          ))}
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

export default CommunityApp

// import React, { useEffect, useState } from "react"
// import "../../style/communitypage/community.scss"
// import axios from "axios"
// import Pagination from "react-js-pagination"
// import "../../style/categorypage/pagination.scss"
// import Cookies from "universal-cookie"

// function CommunityApp() {
//   const [posts, setPosts] = useState([]) // 게시물 목록
//   const [newPostText, setNewPostText] = useState("") // 새 게시물 텍스트
//   const [activePage, setActivePage] = useState(1) // 현재 페이지
//   const postsPerPage = 10 // 페이지당 표시할 게시물 수

//   const cookies = new Cookies()
//   const accessToken = cookies.get("access_token") // 쿠키에서 Access Token 가져오기

//   const handlePageChange = (pageNumber) => {
//     setActivePage(pageNumber)
//   }

//   const handleTextChange = (e) => {
//     setNewPostText(e.target.value)
//   }

//   // READ data
//   useEffect(() => {
//     async function CommunityFetch() {
//       try {
//         const response = await axios.get("http://localhost:4000/api/posts", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//           withCredentials: true, // withCredentials: true를 추가합니다.
//         })
//         setPosts(response.data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     CommunityFetch()
//   }, [accessToken])

//   // write post
//   const handleNewPost = async () => {
//     if (newPostText) {
//       const newPost = {
//         title: newPostText,
//         body: newPostText,
//         userId: 1,
//         id: posts.length + 1,
//       }

//       try {
//         const response = await axios.post(
//           "http://localhost:4000/api/posts",
//           newPost,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//             withCredentials: true, // withCredentials: true를 추가합니다.
//           }
//         )
//         setPosts([newPost, ...posts])
//         setNewPostText("")
//       } catch (e) {
//         console.error("POST 오류:", e)
//       }
//     }
//   }

//   //delete post
//   const handleDeletePost = (id) => {
//     axios
//       .delete(`http://localhost:4000/api/posts/${id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         withCredentials: true, // withCredentials: true를 추가합니다.
//       })
//       .then(() => {
//         const updatedPost = posts.filter((post) => post.id !== id)
//         setPosts(updatedPost)
//       })
//       .catch((error) => {
//         console.error(error)
//       })
//   }

//   const indexOfLastPost = activePage * postsPerPage
//   const indexOfFirstPost = indexOfLastPost - postsPerPage
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

//   return (
//     <div className="community-app">
//       <h2>커뮤니티</h2>
//       <div>
//         <textarea
//           cols={40}
//           rows={10}
//           value={newPostText}
//           onChange={handleTextChange}
//           placeholder="새로운 게시물 작성"
//         />
//       </div>
//       <button onClick={handleNewPost}>제출</button>
//       <div>
//         <h2>게시물 목록</h2>
//         <ul>
//           {currentPosts.map((post) => (
//             <li key={post.id}>
//               <h3>{post.title}</h3>
//               <p>{post.body}</p>
//               <small>작성자: {post.userId}</small>
//               <button onClick={() => handleDeletePost(post.id)}>삭제</button>
//             </li>
//           ))}
//         </ul>
//         <Pagination
//           activePage={activePage}
//           itemsCountPerPage={postsPerPage}
//           totalItemsCount={posts.length}
//           pageRangeDisplayed={5}
//           onChange={handlePageChange}
//           itemClass="page-item"
//           linkClass="page-link"
//         />
//         <br />
//         <br />
//       </div>
//     </div>
//   )
// }

// export default CommunityApp
