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
      const response = await axios.post('https://backendabmprojects.vercel.app/api/users', {
        name,
        email,
        password
      });

      if (response.status === 201) {
        setMessage('Usuario añadido correctamente');
      } else {
        setMessage('Error al añadir usuario');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setMessage('Error al enviar el formulario');
    }
  };

  return (
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
  );
};

export default AddUserForm;
