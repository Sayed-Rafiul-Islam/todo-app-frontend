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
import { addUserLocal, createUser } from '@/app/redux/slice'
import { AppDispatch } from '@/app/redux/store'


type SettingsFormValues = z.infer<typeof formSchema>

interface User {
    _id : string,
    userName : string,
    email : string,
    role : string
}

const formSchema = z.object({
    userName : z.string().min(1),
    email : z.string().min(1),
    role : z.string().min(1),
    password : z.string().min(6)

})


export const UserForm = ({
}) => {

    const dispatch = useDispatch<AppDispatch>()
    const {users} : any = useSelector((data) => data)

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const title = "Create User"
    const description = "Add a new user"
    const toastMessage = "User created"
    const action = "Create"

    const form = useForm<SettingsFormValues>({
        resolver : zodResolver(formSchema) 
    })


    const onSubmit = async (data : SettingsFormValues) => {

        try {
            setLoading(true)
            const exists = users.filter((user : User) => user.email === data.email)

            if (exists.length === 0) {
                const newUser = {
                    name : data.userName,
                    email : data.email,
                    role : data.role,
                    password : data.password
                }
                dispatch(createUser(newUser))
                router.push(`/superAdmin`)
                toast.success(`${toastMessage}`)
            }  else {
                toast.error("User with this email already exists")
            }
                

        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                title={title}
                description={description}
                />
            </div>
            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='user name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='example@gmail.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='***********' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
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
                                                        placeholder="Select role"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>

                                                    <SelectItem value="user" >
                                                        User
                                                    </SelectItem>
                                                    <SelectItem value="admin" >
                                                        Admin
                                                    </SelectItem>
                                                    <SelectItem value="superAdmin" >
                                                        Super Admin
                                                    </SelectItem>
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