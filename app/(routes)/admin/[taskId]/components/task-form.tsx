"use client"

import * as z from 'zod'
import { Trash } from "lucide-react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AlertModal } from '@/components/modals/alert-modal'

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'

import { useDispatch, useSelector } from 'react-redux'
import AccessProvider from '@/actions/accessProvider'
import { removeTask, updateTask } from '@/actions/tasks'
import { addTaskLocal, createTask, removeTaskLocal, updateTaskLocal } from '@/app/redux/slice'
import { AppDispatch } from '@/app/redux/store'


type SettingsFormValues = z.infer<typeof formSchema>

interface Task {
    _id : string | string[],
    taskName : string,
    taskDescription : string,
    assignedBy : string | undefined,
    assignedTo : string,
    status : boolean
}

interface User {
    _id : string,
    userName : string,
    email : string,
    role : string
}

interface TaskFormProps {
    initialData: Task | null,
}

const formSchema = z.object({
    taskName : z.string().min(1),
    taskDescription : z.string().min(1),
    assignedTo : z.string().min(1)

})


export const TaskForm : React.FC<TaskFormProps> = ({
    initialData
}) => {

    const dispatch = useDispatch<AppDispatch>()

    const {user,users} : any  = useSelector((data) => data)
    const data = users.filter((user : User)  => user.role === "user")

    const router = useRouter()
    const {taskId} = useParams()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit task" : ""
    const description = initialData ? "Edit a task" : "Add a new task"
    const toastMessage = initialData ? "Task updated" : "Task created"
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<SettingsFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            taskName : '',
            taskDescription : '',
            assignedTo : ''
    } })


    const onSubmit = async (data : SettingsFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                const updatedTask = {
                    taskId,
                    taskName : data.taskName,
                    taskDescription : data.taskDescription,
                    assignedTo : data.assignedTo,
                }
                dispatch(updateTaskLocal(updatedTask))
                await updateTask(updatedTask)
            } else {
                const newtask = {
                    taskName : data.taskName,
                    taskDescription : data.taskDescription,
                    assignedTo : data.assignedTo,
                    assignedBy : user.email,
                    status : false
                }
                dispatch(createTask(newtask))
            }

            router.push(`/admin`)
            toast.success(`${toastMessage}`)
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await removeTask(taskId)
            dispatch(removeTaskLocal(initialData))
            router.push(`/admin`)
            toast.success("task deleted.")
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                title={title}
                description={description}
                />
                {
                    initialData &&
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Trash />
                    </Button>
                }
            </div>
            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
                        <FormField
                            control={form.control}
                            name="taskName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='task name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="taskDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Put 3 pens in the bottle' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="assignedTo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tasker</FormLabel>
                                        <Select 
                                            disabled={loading} 
                                            onValueChange={field.onChange} 
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue 
                                                        defaultValue={field.value}
                                                        placeholder="Select Tasker"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {data.map(({_id,email, userName} : User)=>(
                                                    <SelectItem key={_id} value={email} >
                                                        {userName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}