import axios from "axios"

const url = "http://localhost:4000"
// const url = "http://15.164.214.143:4000"

export const postChatbot = async (userQuestion) => {
  try {
    const response = await axios.post(`${url}/api/gpt/ask`, {
      question: userQuestion,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
