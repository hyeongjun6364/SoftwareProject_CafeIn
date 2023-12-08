import axios from "axios"

const backendUrl = process.env.REACT_APP_BACK_URL

export const getRecommendApi = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/recommend`)
    return response
  } catch (error) {
    console.log(error)
  }
}
