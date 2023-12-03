import React, { useEffect, useState } from "react"
import "../../style/communitypage/community.scss"
import axios from "axios"
import Pagination from "react-js-pagination"
import "../../style/categorypage/pagination.scss"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import WritePage from "./writePage"

import { useQuery, useMutation, useQueryClient, QueryClient } from "react-query"
import {
  getCommunity,
  postCommunity,
  deleteCommunity,
} from "../API/communityApi"
function CommunityApp() {
  const [activePage, setActivePage] = useState(1) // 현재 페이지
  const [username, setUsername] = useState("")
  const postsPerPage = 10 // 페이지당 표시할 게시물 수
  const navigate = useNavigate()
  const savedUsername = localStorage.getItem("LS_KEY_USERNAME")
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }
  useEffect(() => {
    if (savedUsername) {
      setUsername(savedUsername)
    }
    console.log(username)
  }, [])
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery("communityPosts", getCommunity, {
    staleTime: 60000,
  })
  const queryClient = useQueryClient()
  console.log(posts)
  //cache값 확인하기

  const deletePostMutation = useMutation(
    (id, token) =>
      // axios.delete(`http://localhost:4000/api/posts/${id}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   withCredentials: true, // 모든 쿠키 허용
      // }),
      deleteCommunity(id, token),
    {
      onMutate: (id) => {
        const prevPosts = queryClient.getQueryData("communityPosts")
        queryClient.setQueryData("communityPosts", (oldData) => {
          const updatedData = oldData.filter((post) => post.id !== id)
          return updatedData
        })
        return { prevPosts }
      },
      onError: (error, variables, context) => {
        // 삭제 실패 시 이전 데이터로 롤백
        queryClient.setQueryData("communityPosts", context.prevPosts)
        alert("해당글 사용자가 아닙니다")
      },
      onSettled: () => {
        // 성공 또는 실패 후 쿼리 다시 불러오기
        queryClient.invalidateQueries("communityPosts")
      },
      onSuccess: () => {
        alert("삭제되었습니다.")
      },
    }
  )

  const handleDeletePost = (id) => {
    const token = Cookies.get("access_token")
    deletePostMutation.mutate(id, token)
  }

  //글쓰기
  const handlewrite = () => {
    navigate("/communitywrite")
  }

  const indexOfLastPost = activePage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts
    ? posts.slice(indexOfFirstPost, indexOfLastPost)
    : []

  // update
  const handleupdate = (id, userid) => {
    const token = Cookies.get("access_token")
    navigate(`/write/${id}`)
  }

  return (
    <div className="community-app">
      <h2>커뮤니티</h2>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>게시물 목록</h2>
          <button onClick={handlewrite}>글쓰기</button>
        </div>

        <ul>
          {currentPosts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <small>작성자: {post.user ? post.user.username : "none"}</small>
              {username === `"${post.user.username}"` ? (
                <div>
                  <button onClick={() => handleDeletePost(post._id)}>
                    삭제
                  </button>
                  <button
                    onClick={() => handleupdate(post._id, post.user?._id)}
                  >
                    수정
                  </button>
                </div>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={postsPerPage}
          totalItemsCount={posts?.length || 0}
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
