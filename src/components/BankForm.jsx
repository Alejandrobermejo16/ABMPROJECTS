import React, { useState } from 'react';
import "../styles/Bank.css";
import RegistryBank from './BankRegisrty';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const BankForm = () => {
  const [showRegistry, setShowRegistry] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dniInput, setdniInput] = useState("");
  const [passInput, setPassInput] = useState("");
 
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();  


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const accessRegistry = () => {
    setShowRegistry(true);
    navigate('/abmBank/register');
  };

 
 const reviewUserData = () => {

  setdniInput(dniInput);
  setPassInput(passInput);
  setLoading(true);
  fetch('https://backendabmprojects.vercel.app/api/users/getUserByDniAndPassword', {
    method: 'POST', // Método de la solicitud
    headers: {
        'Content-Type': 'application/json', // Indicar que el contenido es JSON
    },
    body: JSON.stringify({
      dni: dniInput, 
      pass: passInput
    })
})
.then(response => {
  setLoading(false);
    // Manejar la respuesta del servidor
    if (!response.ok) {
      setError("El usuario o la contraseña son incorrectos");
      return;
    }
    setLoading(false);
    navigate('/abmBank/ListProducts', { state: { userName: dniInput } });


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
              <input type="text" placeholder="DNI/NIE"  onChange={(e) => setdniInput(e.target.value)} />
              <label>Password:</label>
              <div className="input-container">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        onChange={(e) => setPassInput(e.target.value)}
      />
      <button type="button" onClick={togglePasswordVisibility} className="eye-button">
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </button>
    </div>
              <button onClick={reviewUserData} className="boton-entrar">ENTRAR</button>
              <p className='errorparraf'>{error}</p>
              {loading ? (
              <Spinner animation="border" role="status" />
              ): ''}

            </div>
          </div>
          <div className="Registro">
            <button className="boton-registrarse" onClick={accessRegistry}>
              ¿No eres cliente? Hazte cliente
            </button>
          </div>
        </div>
        
      ) : (
        <RegistryBank >
          
        </RegistryBank>
        
      )}
    </div>
  );
};

export default BankForm;
