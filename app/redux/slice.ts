"use client"

import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    _id ?: string,
    email ?: string,
    pass_word ?: string,
    password ?: string,
    role ?: string,
    userName ?: string,
    name ?: string,
    accessToken ?: string

}

interface Task {
    _id ?: string,
    taskName ?: string,
    taskDescription ?: string,
    assignedBy ?: string,
    assignedTo ?: string,
    status ?: boolean,
    taskId ?: string,
    id ?: string,
    comment ?: string
  }

interface RootState {
    user: User[];
    assignedTasks: Task[];
    myTasks: Task[];
    users: User[];
    isLoading ?: boolean
  }

  const userJson = typeof window !== "undefined" && localStorage.getItem("user")
  const assignedTasksJson = typeof window !== "undefined" && localStorage.getItem("assignedTasks")
  const myTasksJson = typeof window !== "undefined" && localStorage.getItem("myTasks")
  const usersJson = typeof window !== "undefined" && localStorage.getItem("users")

const { createSlice, current } = require("@reduxjs/toolkit");

const initialState : RootState  = {
    user : userJson ? JSON.parse(userJson) : [],
    assignedTasks : assignedTasksJson ? JSON.parse(assignedTasksJson) : [],
    myTasks : myTasksJson ? JSON.parse(myTasksJson) : [],
    users : usersJson ? JSON.parse(usersJson) : []
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
        logoutUser : (state : RootState , action : PayloadAction<Task> ) => {
            typeof window !== "undefined" && localStorage.removeItem("user")
        },
        // ---------------------------------------------------------------------------------------------------

        // tasks
        updateTaskLocal : (state : RootState , action : PayloadAction<Task> ) => {
            const index = state.assignedTasks.findIndex((task : Task ) => task._id === action.payload.taskId)
            state.assignedTasks[index].taskName = action.payload.taskName
            state.assignedTasks[index].taskDescription = action.payload.taskDescription
            state.assignedTasks[index].assignedTo = action.payload.assignedTo
            localStorage.removeItem("assignedTasks")
            localStorage.setItem("assignedTasks", JSON.stringify(current(state.assignedTasks)))
        },
        removeTaskLocal : (state : RootState, action : PayloadAction<Task> ) => {
            const data = state.assignedTasks.filter((task : Task) => task._id !== action.payload._id)
            localStorage.removeItem("assignedTasks")
            localStorage.setItem("assignedTasks", JSON.stringify(data))
            state.assignedTasks = data
        },
        updateMyTaskLocal : (state : RootState , action : PayloadAction<Task>) => {
            const index = state.myTasks.findIndex((task : Task ) => task._id === action.payload.id)
            state.myTasks[index].status = action.payload.status
        },
        // ---------------------------------------------------------------------------------------------------
    },
    extraReducers : (builder : any ) => {
        // auth -----------------------------------------------------------------
        builder.addCase(signupUser.fulfilled,(state : RootState,action : PayloadAction<User[]> ) => {
            state.isLoading = false,
            state.user = action.payload
        }),
        builder.addCase(loginUser.fulfilled,(state: RootState, action : PayloadAction<User[]>) => {
            state.isLoading = false,
            state.user = action.payload     
        }),
        // ----------------------------------------------------------------------------

        // tasks --------------------------------------------------------------------------------------
        builder.addCase(getAssignedTasks.fulfilled,(state : RootState, action : PayloadAction<Task[]>) => {
            state.isLoading = false,
            state.assignedTasks = action.payload           
        }),
        builder.addCase(getMyTasks.fulfilled,(state : RootState, action : PayloadAction<Task[]>) => {
            state.isLoading = false,
            state.myTasks = action.payload           
        }),
        builder.addCase(getAllUsers.fulfilled,(state : RootState, action : PayloadAction<User[]>) => {
            state.isLoading = false,
            state.users = action.payload           
        }),
        builder.addCase(createTask.fulfilled,(state : RootState, action : PayloadAction<Task>) => {
            state.isLoading = false,
            state.assignedTasks.unshift(action.payload)    
            localStorage.removeItem("assignedTasks")
            localStorage.setItem("assignedTasks", JSON.stringify(current(state.assignedTasks)))    
        }),

        //  user ----------------------------------------------------------------------------------------
        builder.addCase(createUser.fulfilled,(state : RootState, action : PayloadAction<User>) => {
            state.isLoading = false,
            state.users.push(action.payload)      
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(current(state.users)))    
        }),
        builder.addCase(removeUser.fulfilled,(state: RootState , action : PayloadAction<User>) => {
            state.isLoading = false
            const data = state.users?.filter((user : User) => user._id !== action.payload._id)
            state.users = data
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(data))    
        })
        builder.addCase(updateRole.fulfilled,(state: RootState , action : PayloadAction<User> ) => {
            state.isLoading = false
            const index = state.users.findIndex((user : User ) => user._id === action.payload._id)
            state.users[index] = action.payload
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(current(state.users)))    
        })
        builder.addCase(updateMyTask.fulfilled,(state : RootState, action : PayloadAction<Task> ) => {
            state.isLoading = false
            const index = state.myTasks.findIndex((task : Task ) => task._id === action.payload._id)
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