import axios from "axios"

interface NewTask {
    taskName : string,
    taskDescription : string,
    assignedBy : string| undefined,
    assignedTo : string,
}
interface UpdatedTask {
    taskId : string | string[],
    taskName : string,
    taskDescription : string,
    assignedTo : string,
}

export const updateTask = async (updatedTask : UpdatedTask) => {
    const {status} =  await axios.patch(`${process.env.NEXT_PUBLIC_API}/updateTask`,updatedTask)
    return status
}

export const removeTask = async (taskId : string | string[]) => {
    const {status} =  await axios.delete(`${process.env.NEXT_PUBLIC_API}/removeTask?taskId=${taskId}`)
    return status
}


export const getAssignedTasks = async (email : string) => {
    const {data,status} = await axios(`${process.env.NEXT_PUBLIC_API}/getAssignedTasks?email=${email}`)
    return data
}

export const getTaskById = async (taskId : string) => {
    const {data} = await axios(`${process.env.NEXT_PUBLIC_API}/getTaskById?taskId=${taskId}`)
    return data
}

