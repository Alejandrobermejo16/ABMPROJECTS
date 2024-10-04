import React, { useState } from "react";
import "../styles/Bank.css";
import { useNavigate } from 'react-router-dom';  // Asegúrate de importar useNavigate
import Button from "react-bootstrap/Button";
import { FaInfoCircle } from 'react-icons/fa'; 
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Tooltip } from "react-bootstrap";
import { validacionPass } from "../Constants";
import Spinner from 'react-bootstrap/Spinner';
import { Arrow90degLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const RegistryBank = () => {
  const [showtext, setShowtext] = useState(false);
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputPassValue, setInputPassValue] = useState("");
  const [inputDNIValue, setInputDNIValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  

  const navigate = useNavigate();  // Inicializa useNavigate aquí

  const cleanData = () => {
    setErrorMessage("");
    setInputNameValue("");
    setInputPassValue("");
    setInputDNIValue("");
  };

  const sendData = (data) => {
    setLoading(true);
    fetch('https://backendabmprojects.vercel.app/api/users/createUserBank', {
      method: 'POST', // Método de la solicitud
      headers: {
          'Content-Type': 'application/json', // Indicar que el contenido es JSON
      },
      body: JSON.stringify(data) // Convertir el objeto a cadena JSON
  })
  .then(response => {
      // Manejar la respuesta del servidor
      if (response.status(409)) {
        return setErrorMessage("Este usuario ya existe");
      }
      return response.json(); // Convertir la respuesta a JSON
  })
  .then(data => {
      console.log('Success:', data); // Manejar los datos devueltos por el servidor
  })
  .catch(error => {
      console.error('Error:', error); // Manejar cualquier error
  });
  }

  const RandomCardForUser = () => {
    let card = [];
    for (let x = 0; x < 18; x++) { 
      const numero = Math.floor(Math.random() * 10);
      card.push(numero);
    }
    return card.join('');
  };

  const RandomAccountForUser = () => {
    let card = ["ES22"];
    for (let x = 0; x < 18; x++) { 
      const numero = Math.floor(Math.random() * 10);
      card.push(numero);
    }
    return card.join('');
  };

  const showTextFunction = () => {
    const validationResponse = validacionPass(inputPassValue);

    if (validationResponse.length >= 0 || (inputPassValue !== '' && inputNameValue !== '' && inputDNIValue !== '')) {
      if (validationResponse === true) {
        setShowtext(true);
        let prductCard1 = RandomCardForUser();
        let productAccount1 = RandomAccountForUser();
        let prductCard2 = RandomCardForUser();
        let productAccount2 = RandomAccountForUser();
        
        const data = {
          name: inputNameValue,
          pass: inputPassValue,
          dni: inputDNIValue,
          card1: prductCard1,
          card2: prductCard2,
          account1: productAccount1,
          account2: productAccount2,
        };
        cleanData();
        sendData(data);
        setTimeout(() => {
          setLoading(false);
          navigate('/abmBank/login');
        }, 4000)
      
      } else {
        setErrorMessage(validationResponse);
      }
    } else {
      setErrorMessage("Deben de rellenarse todos los campos del formulario");
    }
  };

  return (
    <div className='PantallaRegistroBanco'> 
    <div className="Formulario-registry">
      {!showtext ? (
        <div>
          <Link to="/abmBank/login" className="Salir"> 
        <Arrow90degLeft />
          </Link>
          <p className="data-title">INTRODUCE TUS DATOS DE ACCESO</p>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-info">
                La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial (*/%!)
              </Tooltip>
            }
          >
            <Button variant="primary" style={{ float: 'left' }}>
              <FaInfoCircle /> 
            </Button>
          </OverlayTrigger>

          <div className="entrada-container">
          <label>Introduce tu DNI:</label>
            <input
              type="text"
              placeholder="DNI/NIE"
              value={inputDNIValue}
              onChange={(e) => setInputDNIValue(e.target.value)}
            />
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
            <button
              disabled={inputNameValue.length < 3 || inputPassValue.length < 8}
              className="boton-entrar"
              onClick={showTextFunction}
            >
              REGISTRAR
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      ) : (
        <div>
          <p>Los datos han sido enviados correctamente</p>
          {loading ? (
            <Spinner animation="border" variant="primary"  />
          ): ''}
    
        </div>
        
      )}
    </div>
    </div>
  );
};

export default RegistryBank;
