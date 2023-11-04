// import React, { useState, useEffect } from "react"
// import { useRecoilState } from "recoil"
// import { loggedInState } from "./auth"
// import { Link } from "react-router-dom"
// import "../../style/mypage/loginform.scss"
// import axios from "axios"

// const Login = () => {
//   const [isLogged, setIsLogged] = useRecoilState(loggedInState)
//   const [loginID, setLoginID] = useState("") // 초기 아이디 설정
//   const [loginPassword, setLoginPassword] = useState("") // 초기 비밀번호 설정
//   const [saveIDFlag, setSaveIDFlag] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [passwordInputType, setPasswordInputType] = useState({
//     type: "password",
//     autoComplete: "current-password",
//   })
//   const [capsLockFlag, setCapsLockFlag] = useState(false)

//   useEffect(() => {
//     const savedIDFlag = localStorage.getItem("LS_KEY_SAVE_ID_FLAG")
//     if (savedIDFlag === "true") {
//       setSaveIDFlag(true)
//       const savedID = localStorage.getItem("LS_KEY_ID")
//       if (savedID) {
//         setLoginID(savedID)
//       }
//     }

//     const savedPasswordFlag = localStorage.getItem("LS_KEY_SHOW_PASSWORD")
//     if (savedPasswordFlag === "true") {
//       setShowPassword(true)
//       const newPasswordType = savedPasswordFlag === "true" ? "text" : "password"
//       setPasswordInputType({
//         type: newPasswordType,
//         autoComplete: newPasswordType === "text" ? "off" : "current-password",
//       })
//     }
//   }, [])

//   const checkCapsLock = (e) => {
//     let capsLock = e.getModifierState("CapsLock")
//     setCapsLockFlag(capsLock)
//   }

//   const handleSaveIDFlag = () => {
//     const newFlag = !saveIDFlag
//     setSaveIDFlag(newFlag)
//     localStorage.setItem("LS_KEY_SAVE_ID_FLAG", newFlag.toString())
//     if (!newFlag) {
//       // 아이디 저장을 끌 경우, 로컬 스토리지에서 아이디 제거
//       localStorage.removeItem("LS_KEY_ID")
//     } else {
//       // 아이디 저장을 켤 경우, 현재 입력된 아이디를 로컬 스토리지에 저장
//       localStorage.setItem("LS_KEY_ID", loginID)
//     }
//   }

//   const togglePasswordVisibility = () => {
//     const newShowPassword = !showPassword
//     setShowPassword(newShowPassword)
//     const newType = newShowPassword ? "text" : "password"
//     setPasswordInputType({
//       type: newType,
//       autoComplete: newType === "text" ? "off" : "current-password",
//     })
//   }

//   const login = async () => {
//     try {
//       const response = await axios.post("/api/auth/login", {
//         username: loginID,
//         password: loginPassword,
//       })

//       if (response.status === 200) {
//         localStorage.setItem("login", "true")
//         setIsLogged(true)
//       }
//     } catch (error) {
//       alert("아이디 또는 비밀번호가 올바르지 않습니다.")
//       console.error("로그인 오류:", error)
//     }
//   }

//   return (
//     <div className="login-form">
//       <div className="login-wrapper">
//         <div className="login-container">
//           <div className="login-logo">
//             <span className="logo-image">LOGOIN</span>
//           </div>
//           <form id="loginForm">
//             <div className="input-group">
//               <input
//                 type="text"
//                 id="email"
//                 name="email"
//                 placeholder="아이디"
//                 className="input-id"
//                 onKeyDown={(e) => checkCapsLock(e)}
//                 value={loginID}
//                 onChange={(e) => setLoginID(e.target.value)}
//               />
//               <input
//                 type={passwordInputType.type}
//                 id="password"
//                 name="password"
//                 placeholder="비밀번호"
//                 className="input-pw"
//                 autoComplete={passwordInputType.autoComplete}
//                 onKeyDown={(e) => checkCapsLock(e)}
//                 value={loginPassword}
//                 onChange={(e) => setLoginPassword(e.target.value)}
//               />
//               <span className="checkbox-item">
//                 <input
//                   type="checkbox"
//                   name="showPassward"
//                   id="showPassword"
//                   checked={showPassword}
//                   onChange={togglePasswordVisibility}
//                 />
//                 <label>
//                   <span>
//                     {showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
//                   </span>
//                 </label>
//               </span>
//             </div>
//             <div className="checkbox-wrapper">
//               <span className="checkbox-item">
//                 <input
//                   type="checkbox"
//                   name="saveEmail"
//                   id="saveEmail"
//                   checked={saveIDFlag}
//                   onChange={handleSaveIDFlag}
//                 />
//                 <label>
//                   <span>아이디 저장</span>
//                 </label>
//               </span>
//               <span className="caps-lock">
//                 {capsLockFlag ? "Caps Lock On" : "Caps Lock Off"}
//               </span>
//             </div>

//             <div className="login-button-position">
//               <span className="login-button" onClick={login}>
//                 로그인
//               </span>
//             </div>
//           </form>
//           <ul className="login-li-group">
//             <li>
//               <span onClick={() => alert("아이디 찾기")}>아이디 찾기</span>
//             </li>
//             <li>
//               <span onClick={() => alert("비밀번호 찾기")}>비밀번호 찾기</span>
//             </li>
//             <li>
//               <Link to="/signup">
//                 <span className="bold">회원가입</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login

// import React, { useState, useEffect } from "react"
// import { useRecoilState } from "recoil"
// import { loggedInState } from "./auth"
// import { Link } from "react-router-dom"
// import "../../style/mypage/loginform.scss"
// import axios from "axios"

// const Login = () => {
//   const [isLogged, setIsLogged] = useRecoilState(loggedInState)
//   const [loginID, setLoginID] = useState("") // 초기 아이디 설정
//   const [loginPassword, setLoginPassword] = useState("") // 초기 비밀번호 설정
//   const [saveIDFlag, setSaveIDFlag] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [passwordInputType, setPasswordInputType] = useState({
//     type: "password",
//     autoComplete: "current-password",
//   })
//   const [capsLockFlag, setCapsLockFlag] = useState(false)

//   useEffect(() => {
//     const savedIDFlag = localStorage.getItem("LS_KEY_SAVE_ID_FLAG")
//     if (savedIDFlag === "true") {
//       setSaveIDFlag(true)
//       const savedID = localStorage.getItem("LS_KEY_ID")
//       if (savedID) {
//         setLoginID(savedID)
//       }
//     }

//     const savedPasswordFlag = localStorage.getItem("LS_KEY_SHOW_PASSWORD")
//     if (savedPasswordFlag === "true") {
//       setShowPassword(true)
//       const newPasswordType = savedPasswordFlag === "true" ? "text" : "password"
//       setPasswordInputType({
//         type: newPasswordType,
//         autoComplete: newPasswordType === "text" ? "off" : "current-password",
//       })
//     }
//   }, [])

//   const checkCapsLock = (e) => {
//     let capsLock = e.getModifierState("CapsLock")
//     setCapsLockFlag(capsLock)
//   }

//   const handleSaveIDFlag = () => {
//     const newFlag = !saveIDFlag
//     setSaveIDFlag(newFlag)
//     localStorage.setItem("LS_KEY_SAVE_ID_FLAG", newFlag.toString())
//     if (!newFlag) {
//       // 아이디 저장을 끌 경우, 로컬 스토리지에서 아이디 제거
//       localStorage.removeItem("LS_KEY_ID")
//     } else {
//       // 아이디 저장을 켤 경우, 현재 입력된 아이디를 로컬 스토리지에 저장
//       localStorage.setItem("LS_KEY_ID", loginID)
//     }
//   }

//   const togglePasswordVisibility = () => {
//     const newShowPassword = !showPassword
//     setShowPassword(newShowPassword)
//     const newType = newShowPassword ? "text" : "password"
//     setPasswordInputType({
//       type: newType,
//       autoComplete: newType === "text" ? "off" : "current-password",
//     })
//   }

//   const login = async () => {
//     try {
//       const response = await axios.post("/api/auth/login", {
//         username: loginID,
//         password: loginPassword,
//       })

//       if (response.status === 200) {
//         localStorage.setItem("login", "true")
//         setIsLogged(true)
//         localStorage.setItem("LS_KEY_USERNAME", loginID)
//       }
//     } catch (error) {
//       alert("아이디 또는 비밀번호가 올바르지 않습니다.")
//       console.error("로그인 오류:", error)
//     }
//   }

//   return (
//     <div className="login-form">
//       <div className="login-wrapper">
//         <div className="login-container">
//           <div className="login-logo">
//             <span className="logo-image">LOGOIN</span>
//           </div>
//           <form id="loginForm">
//             <div className="input-group">
//               <input
//                 type="text"
//                 id="email"
//                 name="email"
//                 placeholder="아이디"
//                 className="input-id"
//                 onKeyDown={(e) => checkCapsLock(e)}
//                 value={loginID}
//                 onChange={(e) => setLoginID(e.target.value)}
//               />
//               <input
//                 type={passwordInputType.type}
//                 id="password"
//                 name="password"
//                 placeholder="비밀번호"
//                 className="input-pw"
//                 autoComplete={passwordInputType.autoComplete}
//                 onKeyDown={(e) => checkCapsLock(e)}
//                 value={loginPassword}
//                 onChange={(e) => setLoginPassword(e.target.value)}
//               />
//               <span className="checkbox-item">
//                 <input
//                   type="checkbox"
//                   name="showPassward"
//                   id="showPassword"
//                   checked={showPassword}
//                   onChange={togglePasswordVisibility}
//                 />
//                 <label>
//                   <span>
//                     {showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
//                   </span>
//                 </label>
//               </span>
//             </div>
//             <div className="checkbox-wrapper">
//               <span className="checkbox-item">
//                 <input
//                   type="checkbox"
//                   name="saveEmail"
//                   id="saveEmail"
//                   checked={saveIDFlag}
//                   onChange={handleSaveIDFlag}
//                 />
//                 <label>
//                   <span>아이디 저장</span>
//                 </label>
//               </span>
//               <span className="caps-lock">
//                 {capsLockFlag ? "Caps Lock On" : "Caps Lock Off"}
//               </span>
//             </div>

//             <div className="login-button-position">
//               <span className="login-button" onClick={login}>
//                 로그인
//               </span>
//             </div>
//           </form>
//           <ul className="login-li-group">
//             <li>
//               <span onClick={() => alert("아이디 찾기")}>아이디 찾기</span>
//             </li>
//             <li>
//               <span onClick={() => alert("비밀번호 찾기")}>비밀번호 찾기</span>
//             </li>
//             <li>
//               <Link to="/signup">
//                 <span className="bold">회원가입</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login

import React, { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { loggedInState } from "./auth"
import { Link } from "react-router-dom"
import "../../style/mypage/loginform.scss"
import axios from "axios"

const Login = () => {
  const [isLogged, setIsLogged] = useRecoilState(loggedInState)
  const [loginID, setLoginID] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [saveIDFlag, setSaveIDFlag] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordInputType, setPasswordInputType] = useState({
    type: "password",
    autoComplete: "current-password",
  })
  const [capsLockFlag, setCapsLockFlag] = useState(false)

  useEffect(() => {
    const savedIDFlag = localStorage.getItem("LS_KEY_SAVE_ID_FLAG")
    if (savedIDFlag === "true") {
      setSaveIDFlag(true)
      const savedID = localStorage.getItem("LS_KEY_ID")
      if (savedID) {
        setLoginID(savedID)
      }
    }

    const savedPasswordFlag = localStorage.getItem("LS_KEY_SHOW_PASSWORD")
    if (savedPasswordFlag === "true") {
      setShowPassword(true)
      const newPasswordType = savedPasswordFlag === "true" ? "text" : "password"
      setPasswordInputType({
        type: newPasswordType,
        autoComplete: newPasswordType === "text" ? "off" : "current-password",
      })
    }
  }, [])

  const checkCapsLock = (e) => {
    let capsLock = e.getModifierState("CapsLock")
    setCapsLockFlag(capsLock)
  }

  const handleSaveIDFlag = () => {
    const newFlag = !saveIDFlag
    setSaveIDFlag(newFlag)
    localStorage.setItem("LS_KEY_SAVE_ID_FLAG", newFlag.toString())
    if (!newFlag) {
      localStorage.removeItem("LS_KEY_ID")
    } else {
      localStorage.setItem("LS_KEY_ID", loginID)
    }
  }

  const togglePasswordVisibility = () => {
    const newShowPassword = !showPassword
    setShowPassword(newShowPassword)
    const newType = newShowPassword ? "text" : "password"
    setPasswordInputType({
      type: newType,
      autoComplete: newType === "text" ? "off" : "current-password",
    })
  }

  const login = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        loginid: loginID,
        password: loginPassword,
      })

      if (response.status === 200) {
        localStorage.setItem("login", "true")
        setIsLogged(true)
        const storeName = JSON.stringify(response.data.username)
        localStorage.setItem("LS_KEY_USERNAME", storeName)
      }
    } catch (error) {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.")
      console.error("로그인 오류:", error)
    }
  }

  return (
    <div className="login-form">
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-logo">
            <span className="logo-image">LOGIN</span>
          </div>
          <form id="loginForm">
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="아이디"
                className="input-id"
                onKeyDown={(e) => checkCapsLock(e)}
                value={loginID}
                onChange={(e) => setLoginID(e.target.value)}
              />
              <input
                type={passwordInputType.type}
                id="password"
                name="password"
                placeholder="비밀번호"
                className="input-pw"
                autoComplete={passwordInputType.autoComplete}
                onKeyDown={(e) => checkCapsLock(e)}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <span className="checkbox-item">
                <input
                  type="checkbox"
                  name="showPassward"
                  id="showPassword"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <label>
                  <span>
                    {showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                  </span>
                </label>
              </span>
            </div>
            <div className="checkbox-wrapper">
              <span className="checkbox-item">
                <input
                  type="checkbox"
                  name="saveEmail"
                  id="saveEmail"
                  checked={saveIDFlag}
                  onChange={handleSaveIDFlag}
                />
                <label>
                  <span>아이디 저장</span>
                </label>
              </span>
              <span className="caps-lock">
                {capsLockFlag ? "Caps Lock On" : "Caps Lock Off"}
              </span>
            </div>

            <div className="login-button-position">
              <span className="login-button" onClick={login}>
                로그인
              </span>
            </div>
          </form>
          <ul className="login-li-group">
            <li>
              <span onClick={() => alert("아이디 찾기")}>아이디 찾기</span>
            </li>
            <li>
              <span onClick={() => alert("비밀번호 찾기")}>비밀번호 찾기</span>
            </li>
            <li>
              <Link to="/signup">
                <span className="bold">회원가입</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
