"use client"
import AccessProvider from '@/actions/accessProvider'
import { logoutUser } from '@/app/redux/slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskColumn } from './components/columns'
import { TaskClient } from './components/client'

interface Task {
    _id : string,
    taskName : string,
    taskDescription : string,
    assignedBy : string,
    assignedTo : string,
    status : boolean
  }

export default function User() {

    const data : any = useSelector((data) => data)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        const getUser = async () =>{
            const user = await AccessProvider(data.user.accessToken)
            if (!(user?.user?.role === "user")) {
                dispatch(logoutUser())
            }
        }
        getUser()
    },[data?.user?.role, dispatch])

    const formattedMyTasks : TaskColumn[] = data.myTasks.map(({_id,taskName,taskDescription,assignedTo,status} : Task) => ({
        id : _id,
        label : taskName,
        task : taskDescription,
        tasker : assignedTo,
        status,
    }))
    
    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <TaskClient data={formattedMyTasks} />
            </div>
        </div>
    )
}
