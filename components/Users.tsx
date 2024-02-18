"use Client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../app/redux/slice'

interface User {
    name : string,
    email : string
}

export default function Users() {

  // const [isMounted, setIsMounted] = useState(false)

  // useEffect(()=>{
  //     setIsMounted(true)
  // },[])

  // if (!isMounted) {
  //     return null
  // }

    const {users} : any = useSelector((data)=>data)
    if (users.length !== 0 ) {
      // console.log(users)
    }

    const dispatch = useDispatch<AppDispatch>()
  return (
    <div className='border-slate-800 border-t w-11/12 mx-auto p-10'>
            {   
            // users.length !== 0 &&
            //     users.map( (user : User) => (
            //     <li>
            //       <h2 className='text-lg'>{user.name}</h2>
            //       <p className='text-xs'>{user.email}</p>
            //       {/* <button className='bg-red-500 font- rounded-lg px-4 py-2 text-xs ml-10' onClick={()=>dispatch(removeUser())}>Remove</button> */}
            //     </li>
            //     )

            //     // <li key={index}>{user.name}  
            //     // 
            //     //  </li>
            //   )
            }
    </div>
  )
}
