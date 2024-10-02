import React, { useState } from 'react';
import "../styles/Bank.css";
import RegistryBank from './BankRegisrty';  // Asegúrate de que este nombre esté bien escrito

const BankForm = () => {
  const [showRegistry, setShowRegistry] = useState(false);

  const accessRegistry = () => {
    setShowRegistry(true);
  };

  return (
    <div>
      {!showRegistry ? (
        <div className="Formulario">
          <div className="Entrada">
            <p className="data-title">INTRODUCE TUS DATOS DE USUARIO</p>
            <div className="entrada-container">
              <label>Username:</label>
              <input type="text" placeholder="Username" />
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
