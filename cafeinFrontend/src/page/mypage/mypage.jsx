import React, { useState, useEffect } from "react"
import "../../style/mypage/login.scss"
import Login from "./login" // 컴포넌트 이름 수정
import { useRecoilState } from "recoil"
import { loggedInState } from "./auth"

const MyPage = () => {
  const [isLogged, setIsLogged] = useRecoilState(loggedInState)

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("login")
    if (storedLoginStatus === "true") {
      setIsLogged(true)
    }
  }, [isLogged])

  const handleLogout = () => {
    localStorage.removeItem("login")
    setIsLogged(false)
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
