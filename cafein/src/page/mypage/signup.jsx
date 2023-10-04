import React, { useState } from "react"
import "../../style/mypage/signup.scss" // 스타일 파일 임포트
import axios from "axios"
import Question from "./question"

const SignUp = () => {
  const [username, setUsername] = useState("")
  // const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          username,
          password,
        }
      )

      // 요청이 성공하면 서버에서 반환한 응답을 확인하고 상태를 업데이트합니다.
      if (response.status === 200) {
        setIsRegistered(true) // 계정 생성 성공
        alert("회원가입에 성공했습니다!")
      }
    } catch (error) {
      alert("회원가입에 실패했습니다.")
      console.error("회원가입 오류:", error)
      setIsRegistered(false) // 오류 발생 시 계정 생성 실패
    }
  }

  return (
    <div className="signup-container">
      {isRegistered ? (
        <Question />
      ) : (
        <div className="signup-form-container">
          <h2 className="signup-ok-text">회원가입</h2>
          <div>
            <label className="signup-content-text">아이디:</label>
            <input
              className="signup-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* <div>
            <label>이메일:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div> */}
          <div>
            <label className="signup-content-text">비밀번호:</label>
            <input
              className="signup-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="signup-button" onClick={handleSignUp}>
            가입하기
          </button>
        </div>
      )}
    </div>
  )
}

export default SignUp
