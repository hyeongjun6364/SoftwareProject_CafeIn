import axios from "axios"

export const tasteInfoApi= async()=>{
    try{
        const response = await axios.get('http://localhost:4000/api/auth/register/answer',{ withCredentials: true })
        return response
    }
    catch(error){
        console.log(error)
    }

}