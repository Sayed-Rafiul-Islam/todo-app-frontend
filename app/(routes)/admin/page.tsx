"use client"

import { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'


import AccessProvider from '@/actions/accessProvider'
import { TaskColumn } from './components/columns'
import { TaskClient } from './components/client'
import { logoutUser } from '@/app/redux/slice'
import { AppDispatch } from '@/app/redux/store'
import { Task } from '@/types'

export default function ManageTasksRoot() {

    const data : any  = useSelector((data) => data)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        const getUser = async () =>{
            const user = await AccessProvider(data.user.accessToken)
            if (!(user?.user?.role === "admin")) {
                dispatch(logoutUser())
            }
        }
        getUser()
    },[data?.user?.role, dispatch])



    const formattedTasks : TaskColumn[] = data.assignedTasks?.map(({_id,taskName,taskDescription,assignedTo,status,comment,assignedDate} : Task) => ({
        _id,
        label : taskName,
        task : taskDescription,
        tasker : assignedTo,
        status,
        comment,
        date : format(assignedDate,"MMMM do, yyyy")
    }))

  return (
      <div className="flex-col">
          <div className="flex-1 p-8 pt-6 space-y-4">
                <TaskClient data={formattedTasks} />
          </div>
      </div>
  )
}

