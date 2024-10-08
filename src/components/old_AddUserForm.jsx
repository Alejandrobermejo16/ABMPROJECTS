import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://backendabmprojects.vercel.app';

      // Endpoint para crear usuario
      const createUserResponse = await axios.post(
        `${apiUrl}/api/users/create`,
        { name, email },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Custom-Header': 'valor-personalizado'
          }
        }
      );

      // Manejar la respuesta del servidor
      if (createUserResponse.status === 201) {
        setMessage('Usuario añadido correctamente');
        // Aquí podrías realizar más acciones, como limpiar los campos del formulario
        setName('');
        setEmail('');
        setPassword('')
      } else {
        setMessage('Error al añadir usuario');
      }

      

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      console.error('Respuesta del servidor:', error.response);
      setMessage('Error al enviar el formulario');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Añadir Usuario</button>
        <p>{message}</p> {/* Mostrar mensaje al usuario */}
      </form>
    </div>
  );
};

export default AddUserForm;
