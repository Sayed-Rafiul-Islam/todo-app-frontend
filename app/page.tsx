"use client"

import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getAssignedTasks, getMyTasks } from './redux/slice'
import { AppDispatch } from './redux/store'


export default function RootPage() {
    const router = useRouter()
    const data : any = useSelector((data) => data)
    const dispatch = useDispatch<AppDispatch>()

    if ( data.user.role === "user") {
        dispatch(getMyTasks(data.user.email))
        router.push('/user')
    } else if (data.user.role === "admin") {
        dispatch(getAssignedTasks(data.user.email))
        dispatch(getAllUsers())
        router.push('/admin')
    } else if (data.user.role === "superAdmin") {
        dispatch(getAllUsers())
        router.push('/superAdmin')
    } else {
        router.push('/authentication')
    }    
    return (
        <div></div>
    )
}
