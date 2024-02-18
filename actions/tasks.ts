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
    const {status} =  await axios.patch(`http://localhost:5000/api/updateTask`,updatedTask)
    return status
}
// export const updateMyTask = async (updatedTask : {id : string, status : boolean}) => {
//     const {status} =  await axios.patch(`http://localhost:5000/api/updateMyTask`,updatedTask)
//     return status
// }

export const removeTask = async (taskId : string | string[]) => {
    const {status} =  await axios.delete(`http://localhost:5000/api/removeTask?taskId=${taskId}`)
    return status
}


export const getAssignedTasks = async (email : string) => {
    const {data,status} = await axios(`http://localhost:5000/api/getAssignedTasks?email=${email}`)
    return data
}

export const getTaskById = async (taskId : string) => {
    const {data} = await axios(`http://localhost:5000/api/getTaskById?taskId=${taskId}`)
    return data
}

