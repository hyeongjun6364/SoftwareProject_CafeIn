import axios from "axios"

const backendUrl = process.env.REACT_APP_BACK_URL

export const getCommunity = async () => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/posts?username=&tag&page=`
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const postCommunity = async (newPost) => {
  try {
    const response = await axios.post(`${backendUrl}/api/posts`, newPost, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteCommunity = async (id, token) => {
  try {
    axios.delete(`${backendUrl}/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // 모든 쿠키 허용
    })
  } catch (error) {
    alert("실패")
    throw error
  }
}

export const updateCommunity = async (id, title, body) => {
  try {
    await axios.patch(
      `${backendUrl}/api/posts/${id}`,
      { title, body },
      {
        withCredentials: true,
      }
    )
    alert("게시물이 성공적으로 수정되었습니다.")
  } catch (error) {
    if (title === "" || body === "") {
      alert("게시물 작성 바람.")
    } else {
      alert("게시물 작성 실패")
    }
  }
}
