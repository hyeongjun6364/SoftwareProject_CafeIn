import axios from "axios"

const backendUrl = process.env.REACT_APP_BACK_URL

export const fetchCafeWishList = async (cafename, coffeeId) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/cafe/db_get_${cafename}_menu?beverage=${coffeeId}`
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
