import axios from "axios"

export const fetchCafeWishList = async (cafename, coffeeId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/cafe/db_get_${cafename}_menu?beverage=${coffeeId}`)
      return response
    }
    catch (error) {
      console.log(error)
    }

  }