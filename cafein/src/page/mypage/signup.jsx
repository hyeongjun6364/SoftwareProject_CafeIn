import React, { useState } from "react"
import "../../style/mypage/signup.scss" // 스타일 파일 임포트

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)

  const handleSignUp = () => {
    // 여기에서 입력된 정보로 새로운 계정을 만들고 저장하는 로직을 구현합니다.
    // 실제로는 서버와 통신하여 계정을 생성해야 합니다.

    // 하드코딩 예시:
    if (username === "Admin1234@" && password === "Admin1234@") {
      // 계정 생성 성공
      setIsRegistered(true)
    } else {
      // 계정 생성 실패
      setIsRegistered(false)
    }
  }

  return (
    <div className="signup-form">
      {" "}
      {/* 클래스명 추가 */}
      <h2>회원가입</h2>
      {isRegistered ? (
        <p>회원가입이 완료되었습니다.</p>
      ) : (
        <div>
          <div>
            <label>사용자 이름:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>이메일:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="signup-button" onClick={handleSignUp}>
            가입하기
          </button>{" "}
          {/* 클래스명 추가 */}
        </div>
      )}
    </div>
  )
}

export default SignUp
