"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import AccessProvider from "@/actions/accessProvider";
import { logoutUser } from "@/app/redux/slice";
import { UserClient } from "./components/client";

interface User {
    _id : string,
    email: string,
    userName: string,
    role: string
  }


const SuperAdminRoot = () => {
    const data : any = useSelector((data) => data)
    const dispatch = useDispatch<Dispatch>()

    useEffect(()=>{
        const getUser = async () =>{
            const user = await AccessProvider(data.user.accessToken)
            if (!(user?.user?.role === "superAdmin")) {
                dispatch(logoutUser())
            }
        }
        getUser()
    },[data?.user?.role, dispatch])

    const users = data.users?.filter((user : User)  => user.role !== "superAdmin")


    return ( 
        <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
              <UserClient data={users} />
        </div>
    </div>
     );
}
 
export default SuperAdminRoot;