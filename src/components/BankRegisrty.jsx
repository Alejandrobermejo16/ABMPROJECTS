import React, { useState } from 'react';
import "../styles/Bank.css";
import {  Arrow90degLeft} from "react-bootstrap-icons";


const RegistryBank = () => {
    const [showtext, setShowtext] = useState(false);
    const [inputNameValue, setInputNameValue] = useState('');
    const [inputPassValue, setInputPassValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const showText = () => {
        inputNameValue && inputPassValue
            ? setShowtext(true)
            : setErrorMessage('Los campos no están rellenos');
    };

    return (
        <div className="Formulario-registry">
            {!showtext ? (
                <div>
                    <button className='bi bi-arrow-90deg-left' ><Arrow90degLeft></Arrow90degLeft></button>
                    <p className="data-title">INTRODUCE TUS DATOS DE ACCESO</p>
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
                        <button className="boton-entrar" onClick={showText}>REGISTRAR</button>
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
