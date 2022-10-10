import TaskContext from "./taskContext";
import { useState } from "react";

const TaskState = (props) => {
  const host = "http://localhost:5000"
  const tasksInitial = []
  const [tasks, setTasks] = useState(tasksInitial)

  // Get all Tasks
  const getTasks = async () => {
    // API Call 
    const response = await fetch(`${host}/api/task/fetchalltasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MzkxNzYwZTQ5ZTI4MjI3Y2JkZWQxIn0sImlhdCI6MTY2NTM3MjU1OH0.l-LgMFhyrFxdQg7YD6h14-uj7FizWTiDEsgBnpCKRNc"
      }
    });
    const json = await response.json() 
    setTasks(json)
  }

  // Add a Task
  const addTask = async (taskdesc, tasktype, taskst, tasktimetaken) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/task/addtask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MzkxNzYwZTQ5ZTI4MjI3Y2JkZWQxIn0sImlhdCI6MTY2NTM3MjU1OH0.l-LgMFhyrFxdQg7YD6h14-uj7FizWTiDEsgBnpCKRNc"
    },
      body: JSON.stringify({taskdesc, tasktype, taskst, tasktimetaken})
    });

    const task = await response.json();
    setTasks(tasks.concat(task))
  }

  // Delete a Task
  const deleteTask = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/task/deletetask/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MzkxNzYwZTQ5ZTI4MjI3Y2JkZWQxIn0sImlhdCI6MTY2NTM3MjU1OH0.l-LgMFhyrFxdQg7YD6h14-uj7FizWTiDEsgBnpCKRNc"
    }
    });
    const json = response.json(); 
    const newTasks = tasks.filter((task) => { return task._id !== id })
    setTasks(newTasks)
  }

  // Edit a Task
  const editTask = async (id, taskdesc, tasktype, taskst, tasktimetaken) => {
    // API Call 
    const response = await fetch(`${host}/api/tasks/updatetask/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MzkxNzYwZTQ5ZTI4MjI3Y2JkZWQxIn0sImlhdCI6MTY2NTM3MjU1OH0.l-LgMFhyrFxdQg7YD6h14-uj7FizWTiDEsgBnpCKRNc"
      },
      body: JSON.stringify({taskdesc, tasktype, taskst, tasktimetaken})
    });
    const json = await response.json(); 

     let newTasks = JSON.parse(JSON.stringify(tasks))
    // Logic to edit in client
    for (let index = 0; index < newTasks.length; index++) {
      const element = newTasks[index];
      if (element._id === id) {
        newTasks[index].taskdesc = taskdesc;
        newTasks[index].tasktype = tasktype;
        newTasks[index].taskst = taskst; 
        newTasks[index].tasktimetaken = tasktimetaken; 
        break; 
      }
    }  
    setTasks(newTasks);
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, editTask, getTasks }}>
      {props.children}
    </TaskContext.Provider>
  )

}
export default TaskState;