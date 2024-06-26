import React, { useState } from 'react';
import AddUserForm from '../components/AddUserForm';
import '../styles/abmLoggingScreen.css';

const LoginUserScreen = () => {
    const [loadScreen, setLoadScreen] = useState(false);

    const handleLoginClick = () => {
        // Aquí iría la lógica para hacer la llamada a la API y gestionar el estado de loadScreen
        setLoadScreen(true);
    };

    return (
        <div className='abmLoggingScreen'>
            <div className='abmLoggingScreen-content'>
                <h1>¡Bienvenido a ABM FIT!</h1>
                <p>¿Ya tienes cuenta con nosotros? Inicia sesión con tus datos.</p>
                <button onClick={handleLoginClick}>Iniciar Sesión</button>
                <p>¿No tienes cuenta? Regístrate aquí.</p>
                <AddUserForm />
            </div>
        </div>
    );
};


export default LoginUserScreen;
