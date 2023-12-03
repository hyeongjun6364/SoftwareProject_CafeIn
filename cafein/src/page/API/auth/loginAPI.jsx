import axios from "axios"

const url = "http://localhost:4000"
// const url = "http://15.164.214.143:4000"

export const postLogin = async (loginID, loginPassword) => {
  try {
    const response = await axios.post(`${url}/api/auth/login`, {
      loginid: loginID,
      password: loginPassword,
    })
    return response
  } catch (error) {
    console.log("로그인 오류:", error)
  }
}

export const postLogout = async () => {
  try {
    const response = await axios.post(`${url}/api/auth/logout`)
    return response
  } catch (error) {
    console.log("로그아웃 오류:", error)
  }
}

export const postRegister = async (username, loginid, password) => {
  try {
    const response = await axios.post(`${url}/api/auth/register`, {
      username,
      loginid,
      password,
    })
    return response
  } catch (error) {
    console.log("회원가입 오류:", error)
  }
}
