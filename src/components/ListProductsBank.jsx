import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/ListProductsBank.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {protectedShow} from '../Constants';

const ListProductsBank = () => {
  const navigate = useNavigate();  
  const location = useLocation();
  const { userName } = location.state || {}; 
  const [userData, setUserData] = useState(null);
  const [showModalClose, setShowModalClose] = useState(false);
  const timeoutRef = useRef(null);
  const modalTimeoutRef = useRef(null);


  useEffect(() => {
    const fetchUserData = () => {
      fetch('https://backendabmprojects.vercel.app/api/users/productsUserBank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dni: userName,
        })
      })
      .then(response => response.json())
      .then(data => {
        setUserData(data.data);
      })
      .catch(error => {
        console.error("Hubo un problema con la solicitud fetch:", error);
      });
    };

    if (userName) {
      fetchUserData();
    }
  }, [userName]);

  const closeSession = () => {
    setShowModalClose(false);
    setUserData(null);
    navigate('/abmBank/login');
  };

  const handleUserActivity = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (modalTimeoutRef.current) {
      clearTimeout(modalTimeoutRef.current);
    }

    // Inicia el timeout para mostrar la modal después de 270 segundos
    timeoutRef.current = setTimeout(() => {
      setShowModalClose(true);

      // Inicia el timeout para cerrar sesión después de 30 segundos
      modalTimeoutRef.current = setTimeout(() => {
        closeSession();
      }, 30000);
    }, 270000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    // Inicia la actividad del usuario
    handleUserActivity();

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(modalTimeoutRef.current);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, []);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="Contenedor-tarjetas-padre">
      <Modal show={showModalClose} onHide={() => setShowModalClose(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cerrar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>La sesión expirará pasados 30 segundos si no interactúas.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModalClose(false);
              clearTimeout(modalTimeoutRef.current); // Cancela el timeout de cierre de sesión
              handleUserActivity(); // Reinicia el conteo de actividad del usuario
            }}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <h1 className="usuarioName">Bienvenido, {userData.name}</h1>

      <div className="Cuentas">
        <ListGroup className="Lista" as="ul">
          <ListGroup.Item as="li" active>
            Cuentas
          </ListGroup.Item>
          <ListGroup.Item as="li" onClick={() => navigate(`/abmBank/ListProducts/accounts/${userData.account1}`)}>
            {protectedShow(userData.account1)}
          </ListGroup.Item>
          <ListGroup.Item as="li" onClick={() => navigate(`/abmBank/ListProducts/accounts/${userData.account2}`)}>
            {protectedShow(userData.account2)}
          </ListGroup.Item>
        </ListGroup>
      </div>

      <div className="Tarjetas">
        <ListGroup className="Lista" as="ul">
          <ListGroup.Item as="li" active>
            Tarjetas
          </ListGroup.Item>
          <ListGroup.Item as="li" onClick={() => navigate(`/abmBank/ListProducts/cards/${userData.card1}`)}>
            {protectedShow(userData.card1)} 
          </ListGroup.Item>
          <ListGroup.Item as="li" onClick={() => navigate(`/abmBank/ListProducts/cards/${userData.card2}`)}>
            {protectedShow(userData.card2)}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default ListProductsBank;
