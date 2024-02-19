export type Task = {
    _id : string,
    taskName : string,
    taskDescription : string,
    assignedBy : string,
    assignedTo : string,
    status : boolean,
    comment? : boolean,
    assignedDate : Date,
}