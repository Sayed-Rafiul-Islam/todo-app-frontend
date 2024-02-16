"use client"

import { ChevronsDown, ChevronsUp, Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertModal } from "@/components/modals/alert-modal"
import { removeTask } from "@/actions/tasks"
import { removeTaskLocal } from "@/app/redux/slice"
import { useDispatch } from "react-redux"
// import { deleteProduct } from "@/app/actions/products"

interface CellActionProps {
    data : UserColumn
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const dispatch = useDispatch()

    
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        dispatch(removeTaskLocal(data))
        try {
            setLoading(true)
            // await removeTask(data.id)
            toast.success("Product deleted.")
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const handleRole = async () => {
        if (data.role === "admin") {
            console.log("user")
        } else {
            console.log("admin")
        }
        // dispatch(removeTaskLocal(data))
        // try {
        //     setLoading(true)
        //     // await removeTask(data.id)
        //     toast.success("Product deleted.")
        // } catch (error) {
        //     toast.error("Something went wrong.")
        // } finally {
        //     setLoading(false)
        //     setOpen(false)
        // }
    }


    return (
        <>
            <AlertModal 
            isOpen={open} 
            onClose={()=>setOpen(false)} 
            onConfirm={onDelete} 
            loading={loading} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleRole}>
                        {
                            data.role === "admin" 
                            ? 
                            <>
                                <ChevronsDown className="h-4 w-4 mr-2" />
                                Demote
                            </>
                            : 
                            <>
                                <ChevronsUp className="h-4 w-4 mr-2" />
                                Promote
                            </>
                        }
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setOpen(true)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}