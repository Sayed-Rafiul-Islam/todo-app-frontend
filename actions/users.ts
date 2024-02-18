import axios from "axios"

interface NewTask {
    taskName : string,
    taskDescription : string,
    assignedBy : string,
    assignedTo : string,
}


export const createTask = async (newTask : NewTask) => {
    const {status} =  await axios.post(`${process.env.NEXT_PUBLIC_API}/createTask`,newTask)
    return status
}


export const getUsers = async () => {
    const {data,status} = await axios(`${process.env.NEXT_PUBLIC_API}/getUsers`)
    return data
}
export const getUserById = async (userId : string) => {
    const {data,status} = await axios(`${process.env.NEXT_PUBLIC_API}/getUserById?userId=${userId}`)
    return data
}

export const getTaskById = async (taskId : string) => {
    const {data,status} = await axios(`${process.env.NEXT_PUBLIC_API}/`)
    return []

}

