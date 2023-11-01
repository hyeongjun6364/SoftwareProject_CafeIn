import axios from "axios";
export const getStarbucks = async() => {
    try{
        const response = await axios.get("http://localhost:4000/api/cafe/db_get_starbucks_menu");
        return response
    }
    catch(error){
        console.log(error)
    }
}

export const getEdiya = async() => {
    try{
        const response = await axios.get("http://localhost:4000/api/cafe/db_get_ediya_menu");
        return response
    }
    catch(error){
        console.log(error)
    }
}

export const getPaik = async() => {
    try{
        const response = await axios.get("http://localhost:4000/api/cafe/db_get_paik_menu")
        return response
    }
    catch(error){
        console.log(error)
    }
}

export const getMega = async() => {
    try{
        const response = await axios.get("http://localhost:4000/api/cafe/db_get_mega_menu")
        return response
    }
    catch(error){
        console.log(error)
    }
}

export const getHollys = async() => {
    try{
        const response = await axios.get("http://localhost:4000/api/cafe/db_get_hollys_menu");
        return response
    }
    catch(error){
        console.log(error)
    }
}