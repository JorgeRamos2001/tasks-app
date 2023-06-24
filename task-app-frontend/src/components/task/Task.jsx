import React, { useState } from 'react';
import './Task.css';
import axios from 'axios';
import EditForm from '../editForm/EditForm';

function Task( { task,getTasks }) {
  const [showEdit, setEdit] = useState(false);

  const deleteTask = ()=> {
    axios.delete(`http://localhost:3000/api/${task.idtasks}`)
      .then(response => {
        console.log('Solicitud DELETE exitosa', response);
        getTasks()
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handdleShowForm = () => {
    setEdit(!showEdit)
  }

  return (
    <div className='task-container'>
      <div className='task-content'>
        <p className='task-title'>{task.title}</p>
        <p className='task-description'>{task.description}</p>
        <p className='task-date'>{task.createdate}</p>
      </div>
      <div className='task-buttons'>
        <button className='button button-edit' onClick={handdleShowForm}>
          editar
        </button>
        <button className='button button-remove' onClick={deleteTask}>
          eliminar
        </button>
      </div>
      <div className={`edit-container ${showEdit ? "open-form-container" : "close-form-container"}`}>
          <div className='edit-form'>
              <EditForm task={task} closeForm={() => setEdit(false)} getTasks={getTasks} />
          </div>
      </div>
    </div>
  );
}

export default Task;
