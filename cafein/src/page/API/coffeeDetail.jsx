import axios from "axios"

const url = "http://localhost:4000"
// const url = "http://15.164.214.143:4000"

export const fetchCoffeeDetail = async (cafename, coffeeId) => {
  try {
    const response = await axios.get(
      `${url}/api/cafe/db_get_${cafename}_menu?beverage=${coffeeId}`
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const fetchReview = async (cafeId, coffeeId) => {
  try {
    const response = await axios.get(
      `${url}/api/reviews?beverageId=${cafeId}_${coffeeId}`
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
export const fetchWishList = async (savedUsername) => {
  try {
    const response = await axios.get(`${url}/api/wishlist/${savedUsername}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const PostHeart = async (savedUsername, cafeId, coffeeId) => {
  try {
    const response = await axios.post(
      `${url}/api/wishlist`,
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
      `${url}/api/like/${cafeId}_${coffeeId}`,
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
      `${url}/api/likecount/${cafeId}_${coffeeId}`,
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
    await axios.post(`${url}/api/reviews`, newPost, {
      withCredentials: true,
    })
  } catch (error) {
    console.log(error)
  }
}

export const fetchLikeCountAPI = async (cafeId, coffeeId) => {
  try {
    const response = await axios.get(
      `${url}/api/likecount/${cafeId}_${coffeeId}`
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
