"use client"

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const { createSlice, current } = require("@reduxjs/toolkit");

const initialState = {
    user : typeof window !== "undefined" && (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : []),
    assignedTasks : [],
    myTasks : []
}

export const createUser = createAsyncThunk("createUser", async (userData) => {
    const {data, status} = await axios.post("http://localhost:5000/api/createUser",userData)
    if ( status === 200) {
        localStorage.setItem("user", JSON.stringify(data))
    }
    return data
})


export const loginUser = createAsyncThunk("loginUser", async (userData) => {
    const {data,status} = await axios.post("http://localhost:5000/api/login",userData)
    if ( status === 200) {
        localStorage.setItem("user", JSON.stringify(data))

    }
    return data
})

export const getAssignedTasks = createAsyncThunk("getAssignedTasks", async (email) => {
    const {data,status} = await axios(`http://localhost:5000/api/getAssignedTasks?email=${email}`)
    return data
})

export const getMyTasks = createAsyncThunk("getMyTasks", async (email) => {
    const {data,status} = await axios(`http://localhost:5000/api/getMyTasks?email=${email}`)
    return data
})


const Slice = createSlice({
    name : "addUserSlice",
    initialState,
    reducers : {
        logoutUser : (state , action ) => {
            window.location.assign("/authentication")
            typeof window !== "undefined" && localStorage.removeItem("user")
        },
        addTaskLocal : (state , action ) => {
            state.assignedTasks.push(action.payload)
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

            // state.assignedTasks.push(action.payload)
        },
        removeTaskLocal : (state , action ) => {
            const data = state.assignedTasks.filter((task ) => task._id !== action.payload.id)
            state.assignedTasks = data
        },
        updateMyTaskLocal : (state , action ) => {
            const index = state.myTasks.findIndex((task) => task._id === action.payload.id)
            state.myTasks[index].status = action.payload.status
            // console.log(current(updateMyTaskLocal))
            // state.assignedTasks = data
        },
        removeUser : (state , action ) => {
           const data = state.user.filter((user ) => user.id !== action.payload)
           state.user = data
           const {users} = (current(state))
           let usersData = JSON.stringify(users)
           localStorage.removeItem("users")
           localStorage.setItem("users", usersData)
        }
    },
    extraReducers : (builder ) => {
        builder.addCase(createUser.fulfilled,(state ,action ) => {
            state.isLoading = false,
            state.user = action.payload
        }),
        builder.addCase(loginUser.fulfilled,(state, action) => {
            state.isLoading = false,
            state.user = action.payload     
        }),
        builder.addCase(getAssignedTasks.fulfilled,(state, action) => {
            state.isLoading = false,
            state.assignedTasks = action.payload           
        }),
        builder.addCase(getMyTasks.fulfilled,(state, action) => {
            state.isLoading = false,
            state.myTasks = action.payload           
        })
    }
})

export const {addTaskLocal,updateTaskLocal,removeUser,removeTaskLocal,updateMyTaskLocal,logoutUser} = Slice.actions
export default Slice.reducer