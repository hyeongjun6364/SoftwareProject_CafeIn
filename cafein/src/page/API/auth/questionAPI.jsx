// import axios from "axios"

// const url = "http://localhost:4000"
// // const url = "http://15.164.214.143:4000"

// export const getQeustionAnsewer = async () => {
//   try {
//     const response = await axios.get(`${url}/api/auth/register/answer`)
//     return response.data
//   } catch (error) {
//     console.error("취향 정보를 불러오는 중 오류 발생:", error)
//   }
// }

// questionAPI.jsx

import axios from "axios"

const url = "http://localhost:4000"

export const getQeustionAnsewer = async () => {
  try {
    const response = await axios.get(`${url}/api/auth/register/answer`, {
      withCredentials: true, // 이 부분은 새롭게 추가하거나 확인하세요.
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
