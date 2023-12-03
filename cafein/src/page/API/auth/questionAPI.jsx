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
// const url = "http://15.164.214.143:4000"

export const getQeustionAnsewer = async () => {
  try {
    const response = await axios.get(`${url}/api/auth/register/answer`, {
      withCredentials: true,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const postQuestion = async (data) => {
  try {
    const response = await axios.post(`${url}/api/auth/register/question`, data)
    console.log("서버 응답:", response.data)
    return response
  } catch (error) {
    console.error("데이터를 서버에 보내는 중 오류 발생:", error)
  }
}
