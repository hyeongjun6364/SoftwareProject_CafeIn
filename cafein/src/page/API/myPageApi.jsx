import axios from "axios"

const url = "http://localhost:4000"
// const url = "http://15.164.214.143:4000"

export const fetchCafeWishList = async (cafename, coffeeId) => {
  try {
    const response = await axios.get(
      `${url}/api/cafe/db_get_${cafename}_menu?beverage=${coffeeId}`,
      { withCredentials: true }
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
