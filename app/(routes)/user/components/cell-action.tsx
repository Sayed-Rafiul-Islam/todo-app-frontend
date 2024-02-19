"use client"

import toast from "react-hot-toast"
import { useState } from "react"
import { useDispatch } from "react-redux"

import { TaskColumn } from "./columns"
import { updateMyTask } from "@/app/redux/slice"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AppDispatch } from "@/app/redux/store"
import { TaskAlertModal } from "@/components/modals/task-alert-modal"

interface CellActionProps {
    data : TaskColumn
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const dispatch = useDispatch<AppDispatch>()

    const [checked, setChecked] = useState(data.status)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState('')

    const onCheck = async (check : boolean) => {
        setLoading(true)
        setChecked(check)
        const updatedData = {
            _id : data.id,
            status : check,
            comment : comment
        }
        dispatch(updateMyTask(updatedData))
        if (check) {
            toast.success("Marked as done.")
        } else {
            toast.error("Marked as undone.")
        }

        setLoading(false)
        setOpen(false)
    }

    return (
        <>
            <div className="flex items-center space-x-2">
                <TaskAlertModal
                    isOpen={open} 
                    onClose={()=>setOpen(false)} 
                    onConfirm={()=>onCheck(!checked)} 
                    loading={loading}
                    mark={!checked}
                    comment={comment}
                    setComment={setComment}
                />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Checkbox checked={checked} onClick={()=>setOpen(true)} id="terms" />
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