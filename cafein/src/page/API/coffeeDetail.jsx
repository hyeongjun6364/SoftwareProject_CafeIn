import React from 'react'
import axios from 'axios'

export const fetchCoffeeDetail = async(cafename,coffeeId) =>{
    try {
        const response = await axios.get(`http://localhost:4000/api/cafe/db_get_${cafename}_menu?beverage=${coffeeId}`)
        return response.data
    }
    catch(error){
        console.log(error)
    }
  return (
    <div>coffeeDetail</div>
  )
}

