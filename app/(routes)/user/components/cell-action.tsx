"use client"

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TaskColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertModal } from "@/components/modals/alert-modal"
import { removeTask } from "@/actions/tasks"
import { removeTaskLocal, updateMyTask, updateMyTaskLocal } from "@/app/redux/slice"
import { useDispatch } from "react-redux"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { deleteProduct } from "@/app/actions/products"

interface CellActionProps {
    data : TaskColumn
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const dispatch = useDispatch()

    const [checked, setChecked] = useState(false)

    const onCheck = async () => {
        setChecked(!checked)
        const updatedData = {
            _id : data.id,
            status : !checked
        }
        dispatch(updateMyTask(updatedData))
        // dispatch(updateMyTaskLocal(updatedData))
        if (!checked) {
            toast.success("Marked as done.")
        } else {
            toast.error("Marked as undone.")
        }
        

    }

    return (
        <>
            <div className="flex items-center space-x-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Checkbox checked={checked} onClick={onCheck} id="terms" />
                        </TooltipTrigger>
                        <TooltipContent>
                            {checked ? 'Mark as undone.' : 'Mark as done.'}
                        </TooltipContent>
                    </Tooltip>

                </TooltipProvider>
                
            </div>
        </>
    )
}