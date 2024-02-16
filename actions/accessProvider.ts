"use server"

import axios from "axios"

export default async function AccessProvider(token : string) {
    if (token) {
        const {data,status} = await axios(`http://localhost:5000/api/verify?accessToken=${token}`)
        if (status === 200) {
            return data
        } else {
            return null
        }  
    }
}
