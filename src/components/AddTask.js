import React, {useContext, useState} from 'react'
import taskContext from "../context/tasks/taskContext"

const AddTask = () => {
    const context = useContext(taskContext);
    const {addTask} = context;

    const [task, setTask] = useState({taskdesc: "", tasktype: "", taskst: "", tasktimetaken: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addTask(task.taskdesc, task.tasktype, task.taskst, task.tasktimetaken);
        setTask({taskdesc: "", tasktype: "", taskst: "", tasktimetaken: ""})
    }

    const onChange = (e)=>{
        setTask({...task, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Task</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="taskdesc" className="form-label">Task Description:</label>
                    <input type="text" className="form-control" id="taskdesc" name="taskdesc" aria-describedby="emailHelp" value={task.taskdesc} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="tasktype" className="form-label">Task Type:</label>
                    <input type="text" className="form-control" id="tasktype" name="tasktype" value={task.tasktype} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="taskst" className="form-label">Task Starting Time:</label>
                    <input type="text" className="form-control" id="taskst" name="taskst" value={task.taskst} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tasktimetaken" className="form-label">Total Time Taken:</label>
                    <input type="text" className="form-control" id="tasktimetaken" name="tasktimetaken" value={task.tasktimetaken} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={task.title.length<5 || task.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Task</button>
            </form>
        </div>
    )
}

export default AddTask
