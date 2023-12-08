import axios from "axios"

const backendUrl = process.env.REACT_APP_BACK_URL

export const fetchCoffeeDetail = async (cafename, coffeeId) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/cafe/db_get_${cafename}_menu?beverage=${coffeeId}`
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const fetchReview = async (cafeId, coffeeId) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/reviews?beverageId=${cafeId}_${coffeeId}`
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
export const fetchWishList = async (savedUsername) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/wishlist/${savedUsername}`
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const PostHeart = async (savedUsername, cafeId, coffeeId) => {
  try {
    const response = await axios.post(
      "${backendUrl}/api/wishlist",
      {
        userId: `${savedUsername}`,
        productId: `${cafeId}_${coffeeId}`,
      },
      { withCredentials: true }
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const PostLike = async (cafeId, coffeeId, likeState) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/like/${cafeId}_${coffeeId}`,
      {
        like: likeState,
      },
      { withCredentials: true }
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const PostLikeCount = async (cafeId, coffeeId, likeState) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/likecount/${cafeId}_${coffeeId}`,
      {
        like: likeState,
      },
      { withCredentials: true }
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
export const PostReview = async (newPost) => {
  try {
    await axios.post("${backendUrl}/api/reviews", newPost, {
      withCredentials: true,
    })
  } catch (error) {
    console.log(error)
  }
}

export const fetchLikeCountAPI = async (cafeId, coffeeId) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/likecount/${cafeId}_${coffeeId}`
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
