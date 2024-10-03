import React, { useState } from "react";
import "../styles/Bank.css";
import { validacionPass } from "../Constants";
import Button from "react-bootstrap/Button";
import { FaInfoCircle } from 'react-icons/fa'; 
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Tooltip } from "react-bootstrap";

const RegistryBank = () => {
  const [showtext, setShowtext] = useState(false);
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputPassValue, setInputPassValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


 const cleanData = () => {
    setErrorMessage("");
    setInputNameValue("");
    setInputPassValue("");
 }

  const showTextFunction = () => {
    const validationResponse = validacionPass(inputPassValue);

    if (validationResponse.length >= 0 || (inputPassValue !== '' && inputNameValue !== '')) {
      if (validationResponse === true) {
        setShowtext(true);
        cleanData();
      } else {
        setErrorMessage(validationResponse);
      }
    } else {
        setErrorMessage("Deben de rellenarse todos los campos del formulario");

    }
  };

  return (
    <div className="Formulario-registry">
      {!showtext ? (
        <div>
          <p className="data-title">INTRODUCE TUS DATOS DE ACCESO</p>
          <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id="tooltip-info">
          La contraseña debe contener al menos una letra mayuscula, una minuscula, un numero y un caracter especial(*/%!)
          
        </Tooltip>
      }
    >
      <Button variant="primary" style={{float: 'left'}}>
        <FaInfoCircle /> 
      </Button>
      
    </OverlayTrigger>

          <div className="entrada-container">
            <label>Introduce tu nombre:</label>
            <input
              type="text"
              placeholder="Username"
              value={inputNameValue}
              onChange={(e) => setInputNameValue(e.target.value)}
            />
            <label>Introduce tu contraseña:</label>
            <input
              type="password"
              placeholder="Password"
              value={inputPassValue}
              onChange={(e) => setInputPassValue(e.target.value)}
            />
            <button   disabled={inputNameValue.length < 3 || inputPassValue.length < 8} className="boton-entrar" onClick={showTextFunction}>
              REGISTRAR
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      ) : (
        <p>Los datos han sido enviados correctamente</p>
      )}
    </div>
  );
};

export default RegistryBank;
