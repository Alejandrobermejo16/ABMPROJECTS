import React, { useState } from 'react';
import "../styles/Bank.css";
import RegistryBank from './BankRegisrty';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const BankForm = () => {
  const [showRegistry, setShowRegistry] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dniInput, setDniInput] = useState("");
  const [passInput, setPassInput] = useState("");

  const navigate = useNavigate();  

  const accessRegistry = () => {
    setShowRegistry(true);
    navigate('/abmBank/register');
  };

  const reviewUserData = () => {
    setLoading(true);
    
    fetch('https://backendabmprojects.vercel.app/api/users/getUserByDniAndPassword', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dni: dniInput, 
        password: passInput
      })
    })
    .then(response => {
      setLoading(false);
      if (!response.ok) {
        setError("El usuario o la contraseña son incorrectos");
        return;
      }
      return response.json(); // Asegúrate de manejar la respuesta como JSON
    })
    .then(data => {
      // Aquí verifica si `data` contiene la información del usuario
      if (data) {
        // Navega al nuevo componente, pasando los datos necesarios
        navigate('/ruta-del-nuevo-componente', { state: { userData: data } }); // Cambia a la ruta correcta
      }
    })
    .catch(error => {
      setLoading(false);
      setError("Hubo un error al intentar acceder");
    });
  }

  return (
    <div>
      {!showRegistry ? (
        <div className="Formulario">
          <div className="Entrada">
            <p className="data-title">INTRODUCE TUS DATOS DE USUARIO</p>
            <div className="entrada-container">
              <label>Username:</label>
              <input
                type="text"
                placeholder="DNI/NIE"
                onChange={(e) => setDniInput(e.target.value)} // Actualiza el estado
              />
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassInput(e.target.value)} // Actualiza el estado
              />
              <button onClick={reviewUserData} className="boton-entrar">ENTRAR</button>
              <p className='errorparraf'>{error}</p>
              {loading && <Spinner animation="border" role="status" />}
            </div>
          </div>
          <div className="Registro">
            <button className="boton-registrarse" onClick={accessRegistry}>
              ¿No eres cliente? Hazte cliente
            </button>
          </div>
        </div>
      ) : (
        <RegistryBank />
      )}
    </div>
  );
};

export default BankForm;
