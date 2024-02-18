"use client"

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const { createSlice, current } = require("@reduxjs/toolkit");

const initialState = {
    user : typeof window !== "undefined" && (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : []),
    assignedTasks : typeof window !== "undefined" && (localStorage.getItem("assignedTasks") ? JSON.parse(localStorage.getItem("assignedTasks")) : []),
    myTasks : typeof window !== "undefined" && (localStorage.getItem("myTasks") ? JSON.parse(localStorage.getItem("myTasks")) : []),
    users : typeof window !== "undefined" && (localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []),
}


// auth 

export const signupUser = createAsyncThunk("signupUser", async (userData) => {
    const {data, status} = await axios.post(`${process.env.NEXT_PUBLIC_API}/signupUser`,userData)
    if ( status === 200) {
        localStorage.setItem("user", JSON.stringify(data))
    }
    return data
})
export const loginUser = createAsyncThunk("loginUser", async (userData) => {
    const {data,status} = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`,userData)
    if ( status === 200) {
        localStorage.setItem("user", JSON.stringify(data))

    }
    return data
})

// --------------------------------------------------------------------------------------------------------------------------------------


// task

export const createTask = createAsyncThunk("createTask", async (newTask) => {
    const {data,status} = await axios.post(`${process.env.NEXT_PUBLIC_API}/createTask`,newTask)
    return data
})
export const getAssignedTasks = createAsyncThunk("getAssignedTasks", async (email) => {
    const {data,status} = await axios(`${process.env.NEXT_PUBLIC_API}/getAssignedTasks?email=${email}`)
    localStorage.removeItem("assignedTasks")
    localStorage.setItem("assignedTasks", JSON.stringify(data))
    return data
})

export const updateMyTask = createAsyncThunk("updateMyTask", async (updatedTask) => {
    const {data,status} = await axios.patch(`${process.env.NEXT_PUBLIC_API}/updateMyTask`,updatedTask)
    return data
})
export const getMyTasks = createAsyncThunk("getMyTasks", async (email) => {
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

export const createUser = createAsyncThunk("createUser", async (newUser) => {
    const {data,status} = await axios.post(`${process.env.NEXT_PUBLIC_API}/createUser`,newUser)
    return data
})

export const updateRole = createAsyncThunk("updateRole", async (updatedUser) => {
    const {data,status} = await axios.patch(`${process.env.NEXT_PUBLIC_API}/updateRole`,updatedUser)
    return data
})

export const removeUser = createAsyncThunk("removeUser", async (_id) => {
    const {data,status} = await axios.delete(`${process.env.NEXT_PUBLIC_API}/removeUser?_id=${_id}`)
    return data
})


const Slice = createSlice({
    name : "addUserSlice",
    initialState,
    reducers : {
        // auth 
        logoutUser : (state , action ) => {
            window.location.assign("/authentication")
            typeof window !== "undefined" && localStorage.removeItem("user")
        },
        // ---------------------------------------------------------------------------------------------------

        // tasks
        addTaskLocal : (state , action ) => {
            state.assignedTasks.push(action.payload)
            localStorage.removeItem("assignedTasks")
            localStorage.setItem("assignedTasks", JSON.stringify(current(state.assignedTasks)))
        },
        updateTaskLocal : (state , action ) => {
            const data = state.assignedTasks.filter((task ) => task._id !== action.payload.taskId)
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
        removeTaskLocal : (state , action ) => {
            const data = state.assignedTasks.filter((task ) => task._id !== action.payload[0]._id)
            localStorage.removeItem("assignedTasks")
            localStorage.setItem("assignedTasks", JSON.stringify(data))
            state.assignedTasks = data
        },
        updateMyTaskLocal : (state , action ) => {
            const index = state.myTasks.findIndex((task) => task._id === action.payload.id)
            state.myTasks[index].status = action.payload.status
        },
        // ---------------------------------------------------------------------------------------------------
    },
    extraReducers : (builder ) => {
        // auth -----------------------------------------------------------------
        builder.addCase(signupUser.fulfilled,(state ,action ) => {
            state.isLoading = false,
            state.user = action.payload
        }),
        builder.addCase(loginUser.fulfilled,(state, action) => {
            state.isLoading = false,
            state.user = action.payload     
        }),
        // ----------------------------------------------------------------------------

        // tasks --------------------------------------------------------------------------------------
        builder.addCase(getAssignedTasks.fulfilled,(state, action) => {
            state.isLoading = false,
            state.assignedTasks = action.payload           
        }),
        builder.addCase(getMyTasks.fulfilled,(state, action) => {
            state.isLoading = false,
            state.myTasks = action.payload           
        }),
        builder.addCase(getAllUsers.fulfilled,(state, action) => {
            state.isLoading = false,
            state.users = action.payload           
        }),
        builder.addCase(createTask.fulfilled,(state, action) => {
            state.isLoading = false,
            state.assignedTasks.push(action.payload)      
            localStorage.removeItem("assignedTasks")
            localStorage.setItem("assignedTasks", JSON.stringify(current(state.assignedTasks)))    
        }),

        //  user ----------------------------------------------------------------------------------------
        builder.addCase(createUser.fulfilled,(state, action) => {
            state.isLoading = false,
            state.users.push(action.payload)      
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(current(state.users)))    
        }),
        builder.addCase(removeUser.fulfilled,(state, action) => {
            state.isLoading = false
            const data = state.users?.filter((user) => user._id !== action.payload._id)
            state.users = data
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(data))    
        })
        builder.addCase(updateRole.fulfilled,(state, action) => {
            state.isLoading = false
            const index = state.users.findIndex(user => user._id === action.payload._id)
            state.users[index] = action.payload
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(current(state.users)))    
        })
        builder.addCase(updateMyTask.fulfilled,(state, action) => {
            state.isLoading = false
            const index = state.myTasks.findIndex(task => task._id === action.payload._id)
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