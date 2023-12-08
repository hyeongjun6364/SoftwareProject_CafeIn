import axios from "axios"

const backendUrl = process.env.REACT_APP_BACK_URL

export const getStarbucks = async () => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/cafe/db_get_starbucks_menu`
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getEdiya = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/cafe/db_get_ediya_menu`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getPaik = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/cafe/db_get_paik_menu`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getMega = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/cafe/db_get_mega_menu`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getHollys = async () => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/cafe/db_get_hollys_menu`
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
