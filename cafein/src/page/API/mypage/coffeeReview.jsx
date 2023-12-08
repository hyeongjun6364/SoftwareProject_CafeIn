import axios from "axios"

export const coffeeAllReview = async() => {
    try{
       const response= await axios.get("http://localhost:4000/api/reviews")
       return response
    }
    catch(error){
        console.log(error)
    }
}