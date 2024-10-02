import React, { useState } from 'react';
import AddUserForm from '../components/AddUserForm';
import '../styles/abmLoggingScreen.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios';
import Fit from '../screens/Fit';
import { FaInfoCircle } from 'react-icons/fa'; 
import { Arrow90degLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";


const LoginUserScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const sendDataUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://backendabmprojects.vercel.app';

      const createUserResponse = await axios.post(
        `${apiUrl}/api/users/loggin`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (createUserResponse.status === 200) {
        setMessage('Accediendo a los datos del usuario...');
        setLoadUser(true);
        sessionStorage.setItem('userEmail', email);
      } else {
        setMessage('El usuario o contraseña no existen en la base de datos. Cierra la pestaña y crea un usuario.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setMessage('Error al enviar el formulario');
    } finally {
      setIsLoading(false);
    }
  };

  if (loadUser) {
    return <Fit />;
  } else {
    return (
      <div className="abmLoggingScreen">  
      <Link to="/" className="Salir"> 
        <Arrow90degLeft />
      </Link>   
        <div className="abmLoggingScreen-content">
        <div className='tooltip-class'>
           <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id="tooltip-info">
          Si quieres probar todas las funcionalidades de la aplicación, dejamos a continuación datos de prueba:
          <br />
          Usuario: <strong>pruebados@gmail.com</strong>
          <br />
          Contraseña: <strong>pruebados</strong>
        </Tooltip>
      }
    >
      <Button variant="primary" style={{float: 'left'}}>
        <FaInfoCircle /> 
      </Button>
      
    </OverlayTrigger>
    </div>
          <h1>¡Bienvenido a ABM FIT!</h1>
          <p>¿Ya tienes cuenta con nosotros? Inicia sesión con tus datos?</p>
          <Button onClick={handleLoginClick}>Iniciar Sesión</Button>
          <p>¿No tienes cuenta? Regístrate aquí.</p>
          <AddUserForm />
        
          <Modal show={openModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p>{message}</p>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cerrar
              </Button>
              {isLoading ? (
                <Button variant="primary" disabled>
                  Cargando...
                </Button>
              ) : (
                <Button variant="primary" onClick={sendDataUser}>
                  Iniciar Sesión
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
};

export default LoginUserScreen;
