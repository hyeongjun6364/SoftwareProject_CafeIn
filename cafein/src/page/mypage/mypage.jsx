import React, { useState, useEffect } from "react"
import "../../style/mypage/login.scss"
import Login from "./login" // 컴포넌트 이름 수정
import { useRecoilState } from "recoil"
import { loggedInState } from "./auth"
import axios from "axios"

const MyPage = () => {
  const [isLogged, setIsLogged] = useRecoilState(loggedInState)

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("login")
    if (storedLoginStatus === "true") {
      setIsLogged(true)
    }
  }, [isLogged])

  const handleLogout = async () => {
    try {
      // 로그아웃 요청을 서버로 보냄
      await axios.post("/api/auth/logout")

      // 로컬 스토리지에서 로그인 상태를 제거하고 클라이언트 상태를 업데이트
      localStorage.removeItem("login")
      setIsLogged(false)
    } catch (error) {
      console.error("로그아웃 오류:", error)
    }
  }

  return (
    <div className="mypage-container">
      {isLogged ? (
        <div>
          <h2>Welcome to My Page!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default MyPage
