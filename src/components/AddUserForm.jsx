import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import '../styles/AddUsers.css'; 
import Button from 'react-bootstrap/Button';

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado para el loader

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Mostrar loader al iniciar la petición

    try {
      const apiUrl =
        process.env.REACT_APP_API_URL || "https://backendabmprojects.vercel.app";

      // Endpoint para crear usuario
      const createUserResponse = await axios.post(
        `${apiUrl}/api/users/create`,
        { name, email, password }, // Envía name, email y password
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Manejar la respuesta del servidor
      if (createUserResponse.status === 201) {
        setMessage("Usuario añadido correctamente");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage("Error al añadir usuario");
      }

      // // Ejemplo: Obtener todos los usuarios después de crear uno
      // const getUsersResponse = await axios.get(`${apiUrl}/api/users`); 
      // console.log("Respuesta de obtener usuarios:", getUsersResponse.data);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      console.error("Respuesta del servidor:", error.response);
      setMessage("Error al enviar el formulario");
    } finally {
      setLoading(false); // Ocultar loader al finalizar la petición
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input
          className="inputAdd"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="inputAdd"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inputAdd"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ paddingTop: "10px" }}>
          
          <Button variant="secondary" disabled={name.length < 3 || email.length <3 || password.length < 3} type="submit">Añadir Usuario</Button>
        </div>
        <p>{message}</p> {/* Mostrar mensaje al usuario */}
      </form>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {/* Mostrar loader */}
    </div>
  );
};

export default AddUserForm;
