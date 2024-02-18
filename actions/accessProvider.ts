"use server"

import axios from "axios"
import { redirect } from "next/navigation"

export default async function AccessProvider(token : string) {
    try {
        if (token) {
            const {data,status} = await axios(`${process.env.NEXT_PUBLIC_API}/verify?accessToken=${token}`)
            return data
        }
    } catch (error) {
        console.log(error)
        redirect("/authentication")
    }
}
