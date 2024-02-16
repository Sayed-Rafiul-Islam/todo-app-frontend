import { getTaskById } from "@/actions/tasks";
import { TaskForm } from "./components/task-form";
import { getUsers } from "@/actions/users";

interface User {
    email: string,
    name: string,
    role: string
  }

const Admin = async ({
    params
} : {
    params : { taskId : string}
}) => {

    const task  = await getTaskById(params.taskId)
    const allUsers = await getUsers()
    const users = allUsers.filter((user : User)  => user.role === "user")

    
    return ( 
        <div className="flex-col">
            <div  className="flex-1 p-8 pt-6 space-y-4">
                <TaskForm 
                initialData={task}
                users={users}
                />
            </div>
        </div>
     );
}
 
export default Admin;