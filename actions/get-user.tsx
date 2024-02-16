"use server"

import axios from "axios"

export const getUser = async (id : string) => {
        const {data,status} = await axios(`http://localhost:5000/api/:${id}/getUser`)
        if (status === 200) {
            return data
        } else {
            return null
        }  

}