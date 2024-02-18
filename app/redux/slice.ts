"use client"

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    _id ?: string,
    email?: string,
    userName?: string,
    role?: string,
    password ?: string
}

interface Task {
    _id ?: string,
    taskName ?: string,
    taskDescription ?: string,
    assignedBy ?: string,
    assignedTo ?: string,
    status : boolean
  }

interface RootState {
    user: User[];
    assignedTasks: Task[];
    myTasks: Task[];
    users: User[]
  }


const { createSlice, current } = require("@reduxjs/toolkit");

const initialState : RootState = {
    user : typeof window !== "undefined" && (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : []),
    assignedTasks : typeof window !== "undefined" && (localStorage.getItem("assignedTasks") ? JSON.parse(localStorage.getItem("assignedTasks")) : []),
    myTasks : typeof window !== "undefined" && (localStorage.getItem("myTasks") ? JSON.parse(localStorage.getItem("myTasks")) : []),
    users : typeof window !== "undefined" && (localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []),
}


// auth 

export const signupUser = createAsyncThunk("signupUser", async (userData : User) => {
    const {data, status} = await axios.post(`${process.env.NEXT_PUBLIC_API}/signupUser`,userData)
    if ( status === 200) {
        localStorage.setItem("user", JSON.stringify(data))
    }
    return data
})
export const loginUser = createAsyncThunk("loginUser", async (userData : User) => {
    const {data,status} = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`,userData)
    if ( status === 200) {
        localStorage.setItem("user", JSON.stringify(data))

    }
    return data
})

// --------------------------------------------------------------------------------------------------------------------------------------


// task

export const createTask = createAsyncThunk("createTask", async (newTask : Task) => {
    const {data,status} = await axios.post(`${process.env.NEXT_PUBLIC_API}/createTask`,newTask)
    return data
})
export const getAssignedTasks = createAsyncThunk("getAssignedTasks", async (email : string) => {
    const {data,status} = await axios(`${process.env.NEXT_PUBLIC_API}/getAssignedTasks?email=${email}`)
    localStorage.removeItem("assignedTasks")
    localStorage.setItem("assignedTasks", JSON.stringify(data))
    return data
})

export const updateMyTask = createAsyncThunk("updateMyTask", async (updatedTask : Task) => {
    const {data,status} = await axios.patch(`${process.env.NEXT_PUBLIC_API}/updateMyTask`,updatedTask)
    return data
})
export const getMyTasks = createAsyncThunk("getMyTasks", async (email : string) => {
    const {data,status} = await axios(`${process.env.NEXT_PUBLIC_API}/getMyTasks?email=${email}`)
    localStorage.removeItem("myTasks")
    localStorage.setItem("myTasks", JSON.stringify(data))
    return data
})

// ------------------------------------------------------------------------------------------------------------------------------------

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
    const {data,status} = await axios(`${process.env.NEXT_PUBLIC_API}/getUsers`)
    localStorage.removeItem("users")
    localStorage.setItem("users", JSON.stringify(data))
    return data
})

export const createUser = createAsyncThunk("createUser", async (newUser : User) => {
    const {data,status} = await axios.post(`${process.env.NEXT_PUBLIC_API}/createUser`,newUser)
    return data
})

export const updateRole = createAsyncThunk("updateRole", async (updatedUser : User) => {
    const {data,status} = await axios.patch(`${process.env.NEXT_PUBLIC_API}/updateRole`,updatedUser)
    return data
})

export const removeUser = createAsyncThunk("removeUser", async (_id : string) => {
    const {data,status} = await axios.delete(`${process.env.NEXT_PUBLIC_API}/removeUser?_id=${_id}`)
    return data
})


const Slice = createSlice({
    name : "addUserSlice",
    initialState,
    reducers : {
        // auth 
        logoutUser : (state : any, action : any) => {
            window.location.assign("/authentication")
            typeof window !== "undefined" && localStorage.removeItem("user")
        },
        // ---------------------------------------------------------------------------------------------------

        // tasks
        addTaskLocal : (state : any, action : any) => {
            state.assignedTasks.push(action.payload)
            localStorage.removeItem("assignedTasks")
            localStorage.setItem("assignedTasks", JSON.stringify(current(state.assignedTasks)))
        },
        updateTaskLocal : (state : any, action : any) => {
            const data = state.assignedTasks.filter((task : Task) => task._id !== action.payload.taskId)
            const updatedData = {
                _id : action.payload.taskId,
                taskName : action.payload.taskName,
                taskDescription : action.payload.taskDescription,
                assignedTo : action.payload.assignedTo
            }
            data.push(updatedData)
            state.assignedTasks = data
            localStorage.removeItem("assignedTasks")
            localStorage.setItem("assignedTasks", JSON.stringify(data))
        },
        removeTaskLocal : (state : any, action : any) => {
            const data = state.assignedTasks.filter((task : Task) => task._id !== action.payload[0]._id)
            localStorage.removeItem("assignedTasks")
            localStorage.setItem("assignedTasks", JSON.stringify(data))
            state.assignedTasks = data
        },
        updateMyTaskLocal : (state : any, action : any) => {
            const index = state.myTasks.findIndex((task : Task) => task._id === action.payload.id)
            state.myTasks[index].status = action.payload.status
        },
        // ---------------------------------------------------------------------------------------------------
    },
    extraReducers : (builder : any) => {
        // auth -----------------------------------------------------------------
        builder.addCase(signupUser.fulfilled,(state : any,action : any) => {
            state.isLoading = false,
            state.user = action.payload
        }),
        builder.addCase(loginUser.fulfilled,(state : any, action : any) => {
            state.isLoading = false,
            state.user = action.payload     
        }),
        // ----------------------------------------------------------------------------

        // tasks --------------------------------------------------------------------------------------
        builder.addCase(getAssignedTasks.fulfilled,(state : any, action : any) => {
            state.isLoading = false,
            state.assignedTasks = action.payload           
        }),
        builder.addCase(getMyTasks.fulfilled,(state : any, action : any) => {
            state.isLoading = false,
            state.myTasks = action.payload           
        }),
        builder.addCase(getAllUsers.fulfilled,(state : any, action : any) => {
            state.isLoading = false,
            state.users = action.payload           
        }),
        builder.addCase(createTask.fulfilled,(state : any, action : any) => {
            state.isLoading = false,
            state.assignedTasks.push(action.payload)      
            localStorage.removeItem("assignedTasks")
            localStorage.setItem("assignedTasks", JSON.stringify(current(state.assignedTasks)))    
        }),

        //  user ----------------------------------------------------------------------------------------
        builder.addCase(createUser.fulfilled,(state : any, action : any) => {
            state.isLoading = false,
            state.users.push(action.payload)      
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(current(state.users)))    
        }),
        builder.addCase(removeUser.fulfilled,(state : any, action : any) => {
            state.isLoading = false
            const data = state.users?.filter((user : User) => user._id !== action.payload._id)
            state.users = data
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(data))    
        })
        builder.addCase(updateRole.fulfilled,(state : any, action : any) => {
            state.isLoading = false
            const index = state.users.findIndex((user : User) => user._id === action.payload._id)
            state.users[index] = action.payload
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(current(state.users)))    
        })
        builder.addCase(updateMyTask.fulfilled,(state : any, action : any) => {
            state.isLoading = false
            const index = state.myTasks.findIndex((task : Task) => task._id === action.payload._id)
            state.myTasks[index] = action.payload
            localStorage.removeItem("myTasks")
            localStorage.setItem("myTasks", JSON.stringify(current(state.myTasks)))    
        })
    }
})

export const {
    addTaskLocal,
    updateTaskLocal,
    removeTaskLocal,
    updateMyTaskLocal,
    logoutUser,
    addUserLocal,
} = Slice.actions
export default Slice.reducer