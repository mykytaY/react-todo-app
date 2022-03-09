import React, { useState, useEffect } from "react";
import './ToDoList.css';
import {MdDeleteForever} from 'react-icons/md';

const Task = function ({ task, index, completeTask, deleteTask }) {
    return (
        <div className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}>
            {task.title}
            <button style={{background: 'red'}} onClick={() => deleteTask(index)}><MdDeleteForever/></button>
            <button onClick={() => completeTask(index)}>Complete</button>
        </div>
    )
}


function NewTask({ addTask }) {
    const [value, setValue] = useState('');
    const handleSubmit = ev => {
        ev.preventDefault();
        if (!value) return;
        
        addTask(value);
        setValue('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="input" value={value} placeholder="Add new task" onChange={ev => setValue(ev.target.value)} />
        </form>
    )
}

function ToDoList() {
    const [tasksLeft, setTasksLeft] = useState(0);
    const [tasks, setTasks] = useState([
        {
            title: "Full Stack Final Project",
            completed: false
        },
        {
            title: "Testing Final Project",
            completed: false
        },
        {
            title: "Security Final Project",
            completed: false
        },
        {
            title: "Cross Platform Assignment",
            completed: true
        }
    ]);
    useEffect(() => {
        setTasksLeft(tasks.filter(task => !task.completed).length);
    },[tasks]);
    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
    };
    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };
    const deleteTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }
    return (
        <div className="container">
            <div className="header">Pending Tasks ({tasksLeft})</div>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task task={task} index={index} completeTask={completeTask} deleteTask={deleteTask} key={index}/>
                ))}
            </div>
            <div className="new-task">
                <NewTask addTask={addTask} />
            </div>
        </div>
    )
}

export default ToDoList;