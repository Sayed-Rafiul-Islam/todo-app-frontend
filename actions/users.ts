import axios from "axios"

interface NewTask {
    taskName : string,
    taskDescription : string,
    assignedBy : string,
    assignedTo : string,
}


export const createTask = async (newTask : NewTask) => {
    const {status} =  await axios.post(`http://localhost:5000/api/createTask`,newTask)
    return status
}


export const getUsers = async () => {
    const {data,status} = await axios(`http://localhost:5000/api/getUsers`)
    return data
}

export const getTaskById = async (taskId : string) => {
    const {data,status} = await axios(`http://localhost:5000/api/`)
    return []

}

