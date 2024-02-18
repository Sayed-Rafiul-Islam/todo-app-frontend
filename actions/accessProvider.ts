"use server"

import axios from "axios"
import { redirect } from "next/navigation"

export default async function AccessProvider(token : string) {
    try {
        if (token) {
            const {data,status} = await axios(`http://localhost:5000/api/verify?accessToken=${token}`)
            return data
        }
    } catch (error) {
        console.log(error)
        redirect("/authentication")
    }
}
