import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Endpoint para crear usuario
      const createUserResponse = await axios.post(
        'https://backendabmprojects.vercel.app/api/users',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Custom-Header': 'valor-personalizado' // Cabecera personalizada
          }
        }
      );

      // Endpoint para obtener todos los usuarios
      const getUsersResponse = await axios.get(
        'https://backendabmprojects.vercel.app/api/users'
      );

      // Endpoint para obtener un usuario por ID (ejemplo con ID = 123)
      const getUserByIdResponse = await axios.get(
        'https://backendabmprojects.vercel.app/api/users/123'
      );

      // Mostrar mensajes según las respuestas de cada endpoint
      if (createUserResponse.status === 201) {
        setMessage('Usuario añadido correctamente');
      } else {
        setMessage('Error al añadir usuario');
      }

      console.log('Respuesta de crear usuario:', createUserResponse.data);
      console.log('Respuesta de obtener usuarios:', getUsersResponse.data);
      console.log('Respuesta de obtener usuario por ID:', getUserByIdResponse.data);

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
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Añadir Usuario</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default AddUserForm;
