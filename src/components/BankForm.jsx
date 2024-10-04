import React, { useState } from 'react';
import "../styles/Bank.css";
import RegistryBank from './BankRegisrty';
import { useNavigate } from 'react-router-dom';



const BankForm = () => {
  const [showRegistry, setShowRegistry] = useState(false);

  const navigate = useNavigate();  


  const accessRegistry = () => {
    setShowRegistry(true);
    navigate('/abmBank/register');
  };

 


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
              <button className="boton-entrar">ENTRAR</button>
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
