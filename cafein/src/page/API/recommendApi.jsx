import axios from "axios"

export const getRecommendApi = async()=>{
    try{
        const response= await axios.get('http://localhost:3000/api/recommend')
        return response
    }
    catch(error){
        console.log(error)
    }
}