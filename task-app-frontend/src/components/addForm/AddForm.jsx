import React, { useState } from 'react';
import './AddForm.css';

function AddForm({ closeForm, addTask }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const showCloseConfirm = () => {
    if (title.trim() === '' && description.trim() === '') {
      closeForm();
    } else {
      setShowConfirm(true);
    }
  };

  const closeConfirm = () => {
    if (close === true) {
      setShowConfirm(false);
      closeForm();
      setTitle('');
      setDescription('');
    } else {
      setShowConfirm(false);
    }
  };

  const handdleSubmit = (event)=> {
    event.preventDefault();

    if(title.trim() === '' || description.trim() === '') {
      alert('todos los campos son obligatorios')
      return
    }

    const taskBody = {
      "title": title,
      "description": description,
      "createdate": '2023-06-25'
    }

    addTask(taskBody)
    close = true;
    closeConfirm();
  }
  return (
    <div className='form-container'>
      <form onSubmit={handdleSubmit}>
        <button type='button' className='close-button' onClick={showCloseConfirm}>
          X
        </button>
        <h3 className='form-title'>Agregar una nueva tarea</h3>
        <div className='input-group'>
          <label htmlFor='title'>Titulo:</label>
          <input
            type='text'
            value={title}
            id='title'
            className='title-input'
            onChange={(e) => {
                setTitle(e.target.value)
            }}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='description'>Descripción:</label>
          <textarea
            name='description'
            id='description'
            value={description}
            className='description-input'
            onChange={(e) => {
                setDescription(e.target.value)
            }}
            cols='30'
            rows='10'
          ></textarea>
        </div>

        <button type='submit' className='form-button'>
          Agregar
        </button>
      </form>

      <div className={`close-confirm ${showConfirm ? 'show-confirm' : 'hide-confirm'}`}>
        <div className='close-confirm-content'>
          <h4>¿Estás seguro que deseas salir?</h4>
          <div className='close-confirm-buttons'>
            <button
              onClick={() => {
                close = true;
                closeConfirm();
              }}
            >
              Sí
            </button>
            <button
              onClick={() => {
                close = false;
                closeConfirm();
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

export default AddForm;
