import axios from "axios"

export const getRecommend = async() => {
    try{
        const response = await axios.get('http://localhost:4000/api/recommend/recommendation')
        return response.data
    }
    catch(error){
        console.log(error)
    }
}
export const postRecommend = async(coffeeid) => {
    try{
        const response = await axios.post('http://localhost:4000/api/recommend/recommendation',{
            "selected": coffeeid
        })
        return response.data
    }
    catch(error){
        console.log(error)
    }
}
