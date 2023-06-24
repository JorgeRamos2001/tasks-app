import React, { useState, useEffect } from 'react';
import './EditForm.css';
import axios from 'axios';

function EditForm({ task, closeForm, getTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setNewTitle(task.title);
    setNewDescription(task.description);
    setTitle(task.title);
    setDescription(task.description);
  }, []);

  const cargarDatos = () => {
    setNewTitle(task.title);
    setNewDescription(task.description);
    setTitle(task.title);
    setDescription(task.description);
  }

  const showCloseConfirm = () => {
    if (newTitle === title && newDescription === description) {
      closeForm();
    } else {
      setShowConfirm(true);
    }
  };

  const closeConfirm = (close) => {
    if (close === true) {
      setShowConfirm(false);
      closeForm();
      setTitle('');
      setDescription('');
      setNewTitle('')
      setNewDescription('')
      cargarDatos()
    } else {
      setShowConfirm(false);
    }
  };

  const handdleSubmit = (event)=> {
    event.preventDefault();

    if (newTitle === title && newDescription === description) {
      closeForm();
      return
    } 

    const taskBody = {
      "title": newTitle,
      "description": newDescription,
    }

    axios.post(`http://localhost:3000/api/${task.idtasks}`, taskBody)
      .then(response => {
        closeConfirm(true);
        console.log('cambios correctos')
        getTasks()
      })
      .catch(error => {
        console.error(error);
      });
      
  }
  return (
    <div className='form-container'>
      <form onSubmit={handdleSubmit}>
        <button type='button' className='close-button' onClick={showCloseConfirm}>
          X
        </button>
        <h3 className='form-title'>Editar una tarea</h3>
        <div className='input-group'>
          <label htmlFor='title'>Titulo:</label>
          <input
            type='text'
            id='title'
            className='title-input'
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='description'>Descripción:</label>
          <textarea
            name='description'
            id='description'
            className='description-input'
            cols='30'
            rows='10'
            value={newDescription}
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
          ></textarea>
        </div>

        <button type='submit' className='form-button'>
          Confirmar cambios
        </button>
      </form>

      <div className={`close-confirm ${showConfirm ? 'show-confirm' : 'hide-confirm'}`}>
        <div className='close-confirm-content'>
          <h4>¿Estás seguro que deseas salir?</h4>
          <div className='close-confirm-buttons'>
            <button
              onClick={() => {
                closeConfirm(true);
              }}
            >
              Sí
            </button>
            <button
              onClick={() => {
                closeConfirm(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
