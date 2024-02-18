"use client"

import { getAssignedTasks } from "@/actions/tasks";
import { TaskClient } from "@/app/(routes)/user/components/client";
import { TaskColumn } from "@/app/(routes)/user/components/columns";
import { useEffect, useState } from "react";

interface ManageTaskProps {
    email : string
}

interface Task {
    _id : string,
    taskName : string,
    taskDescription : string,
    assignedBy : string,
    assignedTo : string,
}

const ManageTask : React.FC<ManageTaskProps> = ({email}) => {

    const [tasks, setTasks] = useState([])
    
    useEffect(()=> {
        const getTasks = async () => {
            const tasks = await getAssignedTasks(email)
            setTasks(tasks)
        }
        getTasks()
    },[email])
    

    const formattedTasks : TaskColumn[] = tasks.map(({_id,taskName,taskDescription,assignedTo} : Task) => ({
        id : _id,
        label : taskName,
        task : taskDescription,
        tasker : assignedTo,
    }))


    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <TaskClient data={formattedTasks} />
            </div>
        </div>
     );
}
 
export default ManageTask;