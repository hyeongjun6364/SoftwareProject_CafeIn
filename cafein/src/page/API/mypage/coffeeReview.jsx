import axios from "axios"

const backendUrl = process.env.REACT_APP_BACK_URL

export const coffeeAllReview = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/reviews`)
    return response
  } catch (error) {
    console.log(error)
  }
}
