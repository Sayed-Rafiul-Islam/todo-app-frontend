import { getTaskById } from "@/actions/tasks";
import { TaskForm } from "./components/task-form";

const Admin = async ({
    params
} : {
    params : { taskId : string}
}) => {

    const task  = await getTaskById(params.taskId)

    
    return ( 
        <div className="flex-col">
            <div  className="flex-1 p-8 pt-6 space-y-4">
                <TaskForm 
                initialData={task?.length === 1 ? task[0] : task }
                />
            </div>
        </div>
     );
}
 
export default Admin;