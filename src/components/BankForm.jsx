import React, { useState } from 'react';
import "../styles/Bank.css";
import RegistryBank from './BankRegisrty';
import { useNavigate } from 'react-router-dom';



const BankForm = () => {
  const [showRegistry, setShowRegistry] = useState(false);
  const [error, setError] = useState("");


  const navigate = useNavigate();  


  const accessRegistry = () => {
    setShowRegistry(true);
    navigate('/abmBank/register');
  };

 
 const reviewUserData = () => {
  fetch('https://backendabmprojects.vercel.app/api/users/getUserByDniAndPassword', {
    method: 'GET', // Método de la solicitud
    headers: {
        'Content-Type': 'application/json', // Indicar que el contenido es JSON
    },
})
.then(response => {
    // Manejar la respuesta del servidor
    if (!response.ok) {
      setError("El usuario o la contraseña son incorrectos");
      return;
    }
 //en el else que seria aqui tengo que poner el componente nuevo al que navegara en caso de que si que sea respuesta válida
 //estaría bien que en caso de que se acceda , le pasemos al componente, los datos que se puedan ver no contrasñea por ejemplo 
 //pero si nombre y demás
  })
}

  return (
    <div>
      {!showRegistry ? (
        <div className="Formulario">
          <div className="Entrada">
            <p className="data-title">INTRODUCE TUS DATOS DE USUARIO</p>
            <div className="entrada-container">
              <label>Username:</label>
              <input type="text" placeholder="DNI/NIE" />
              <label>Password:</label>
              <input type="password" placeholder="Password" />
              <button onClick={reviewUserData} className="boton-entrar">ENTRAR</button>
              <p className='errorparraf'>{error}</p>
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
