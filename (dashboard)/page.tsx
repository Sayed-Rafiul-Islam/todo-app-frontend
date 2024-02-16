"use client"
import Users from "@/components/Users";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";




export default function Home() {

  // const [users , setUsers] = useState([])


  // useEffect(()=>{

  //   const getAllUsers = async () => {
  //     const users = await getUsers()
  //     setUsers(users)
  //   }
  //   getAllUsers()

  // },[])



  // useEffect(()=>{
  //     const dispatch = useDispatch<AppDispatch>()
  // },[])




 




  return (
    <div>
      {/* <AddUsers /> */}
      <Users />
    </div>
  );
}
