import axios from "axios"

const url = "http://localhost:4000"
// const url = "http://15.164.214.143:4000"

export const coffeeAllReview = async () => {
  try {
    const response = await axios.get(`${url}/api/reviews`)
    return response
  } catch (error) {
    console.log(error)
  }
}
