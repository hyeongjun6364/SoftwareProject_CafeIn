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
    console.log(error)
  }
}
