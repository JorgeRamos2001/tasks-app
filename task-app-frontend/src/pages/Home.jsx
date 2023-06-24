import React, { useEffect, useState } from 'react';
import './Home.css';
import Task from '../components/task/Task';
import AddForm from '../components/addForm/AddForm';
import EditForm from '../components/editForm/EditForm';
import axios from 'axios';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Obtener los datos usando una petición GET al endpoint '/api/datos'
    getTasks()
  }, []);

  const getTasks = ()=> {
    axios.get('http://localhost:3000/api')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const addTask = (newTask) => {
    axios.post('http://localhost:3000/api', newTask)
      .then(response => {
        getTasks() // Agrega la nueva tarea al arreglo existente
      })
      .catch(error => {
        console.error(error);
      });
  };
  

  const handdleShowForm = () => {
    setShowForm(!showForm)
  }

  return (
    <div>
      <div className='container'>
        <h1 className='app-tittle'>Task App</h1>
        <button type='button' className='add-button' onClick={handdleShowForm}>
          add task
        </button>
        <div className='tasks-container'>
          <p className='tasks-container-tittle'>Tasks</p>
          {tasks.length === 0 ? (
            <h2>No hay tareas aún.</h2>
          ) : (
            <ul className='tasks-list'>
              {tasks.map((task) => {
                return (
                  <li key={task.idtasks}>
                    <Task task={task} getTasks={getTasks} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <p className='footer'>Task App Copyright © 2023 Task App - All rights reserved || Created By: Jorge Ramos</p>
      </div>
      <div className={`add-container ${showForm ? "open-form-container" : "close-form-container"}`}>
          <div className='add-form'>
           <AddForm addTask={addTask} closeForm={() => setShowForm(false)} /> 
          </div>
      </div>
    
    </div>
  );
}

export default Home;
