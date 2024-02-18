"use client"
import { useEffect, useState } from "react";
import { UserForm } from "./components/user-form";
import { getAllUsers } from "@/app/redux/slice";
import { useDispatch, useSelector } from "react-redux";

interface User {
    email: string,
    name: string,
    role: string
  }

const SuperAdmin = async ({
    params
} : {
    params : { userId : string}
}) => {
    
    return ( 
        <div className="flex-col">
            <div  className="flex-1 p-8 pt-6 space-y-4">
                <UserForm
                />
            </div>
        </div>
     );
}
 
export default SuperAdmin;