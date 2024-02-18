"use client"
import AccessProvider from '@/actions/accessProvider'
import { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'

import { TaskColumn } from './components/columns'
import { TaskClient } from './components/client'
import { logoutUser } from '@/app/redux/slice'


interface Task {
  _id : string,
  taskName : string,
  taskDescription : string,
  assignedBy : string,
  assignedTo : string,
  status : boolean
}


export default function ManageTasksRoot() {


    const data : any  = useSelector((data) => data)
    const dispatch = useDispatch()

    useEffect(()=>{
        const getUser = async () =>{
            const user = await AccessProvider(data.user.accessToken)
            if (!(user?.user?.role === "admin")) {
                dispatch(logoutUser())
            }
        }
        getUser()
    },[])

    const formattedTasks : TaskColumn[] = data.assignedTasks?.map(({_id,taskName,taskDescription,assignedTo,status} : Task) => ({
        id : _id,
        label : taskName,
        task : taskDescription,
        tasker : assignedTo,
        status
    }))

  return (
      <div className="flex-col">
          <div className="flex-1 p-8 pt-6 space-y-4">
                <TaskClient data={formattedTasks} />
          </div>
      </div>
  )
}

