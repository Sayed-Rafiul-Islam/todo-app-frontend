"use client"

import { useEffect, useState } from "react"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"


interface TaskAlertModalProps {
    isOpen : boolean,
    onClose : () => void,
    onConfirm : () => void,
    loading : boolean,
    mark : boolean | undefined,
    comment : string,
    setComment : any
}

export const TaskAlertModal : React.FC<TaskAlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    mark,
    comment,
    setComment

}) => {
    const [isMounted, setIsMounted] = useState(false)


    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }
    
    const description = mark
    ? `You want to mark this task as done.`
    : `You want to mark this task as undone.`



    return (
        <Modal 
            title="Are you sure?"
            description={description}
            isOpen={isOpen}
            onClose={onClose}
        >
            <textarea className="bg-black bg-opacity-10 p-2 rounded-lg dark:text-white text-black focus:outline-none 
            focus:border-b border-black dark:border-white w-11/12" 
            name="comment" 
            rows={5}
            placeholder="Leave a comment (optional)"
            value={comment}
            onChange={e=>setComment(e.target.value)}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant='outline' onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant={mark ? 'constractive' : 'destructive'} onClick={onConfirm}>
                    {mark ? "Task Done" : "Task Undone"}
                </Button>
            </div>
        </Modal>
    )
}