"use client"
import AccessProvider from "@/actions/accessProvider";
import { getUsers } from "@/actions/users";
import { logoutUser } from "@/app/redux/slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserClient } from "./components/client";

interface User {
    email: string,
    userName: string,
    role: string
  }

const SuperAdmin = () => {
    const data : any = useSelector((data) => data)
    const dispatch = useDispatch()

    const [users, setUsers ] = useState([])

    useEffect(()=>{
        const getUser = async () =>{
            const user = await AccessProvider(data.user.accessToken)
            if (!(user.user.role === "superAdmin")) {
                dispatch(logoutUser())
            }
            const allUsers = await getUsers()
            const users = allUsers.filter((user : User)  => user.role !== "superAdmin")
            setUsers(users)
        }
        getUser()
    },[])

    console.log(users)

    return ( 
        <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
              <UserClient data={users} />
        </div>
    </div>
     );
}
 
export default SuperAdmin;