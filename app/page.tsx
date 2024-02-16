"use client"

import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getAssignedTasks, getMyTasks } from './redux/slice'


export default function RootPage() {
    const router = useRouter()
    const data : any = useSelector((data) => data)
    const dispatch = useDispatch()

    if ( data.user.role === "user") {
        dispatch(getMyTasks(data.user.email))
        router.push('/user')
    } else if (data.user.role === "admin") {
        dispatch(getAssignedTasks(data.user.email))
        router.push('/admin')
    } else if (data.user.role === "superAdmin") {
        router.push('/superAdmin')
    } else {
        // router.push('/authentication')
    }    
    return null
}
