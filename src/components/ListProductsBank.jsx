import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/ListProductsBank.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ListProductsBank = () => {
  const navigate = useNavigate();  
  const location = useLocation();
  const { userName } = location.state || {}; 
  const [userData, setUserData] = useState(null);
  const [showModalClose, setShowModalClose] = useState(false);
  const timeoutRef = useRef(null); // Referencia para el temporizador de inactividad
  const modalTimeoutRef = useRef(null); // Referencia para el temporizador del modal

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
        console.log("Datos obtenidos:", data);
        setUserData(data.data);
        console.log(data);
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
    // Cerrar el modal y navegar a la página de login
    setShowModalClose(false);
    setUserData(null); // Limpiar los datos del usuario
    navigate('/abmBank/login'); // Navegar a la página de login
  };

  // Manejar la actividad del usuario para reiniciar el temporizador
  const handleUserActivity = () => {
    // Reiniciar el temporizador de inactividad
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reiniciar el temporizador para mostrar el modal después de 4 minutos y 30 segundos
    timeoutRef.current = setTimeout(() => {
      setShowModalClose(true); // Mostrar modal
      // Iniciar temporizador de 30 segundos para cerrar sesión automáticamente
      modalTimeoutRef.current = setTimeout(() => {
        closeSession(); // Cerrar sesión automáticamente después de 30 segundos
      }, 30000); // 30,000 ms = 30 segundos
    }, 270000); // 270,000 ms = 4 minutos y 30 segundos
  };

  // Añadir event listeners para detectar actividad del usuario
  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    // Iniciar el temporizador al montar el componente
    handleUserActivity(); // Llama a la función al iniciar

    // Limpiar los event listeners y los temporizadores al desmontar
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(modalTimeoutRef.current);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, []);

  // Verifica que userData no sea null
  if (!userData) {
    return <div>Cargando...</div>; // Puedes mostrar un mensaje de carga
  }

  return (
    <div className="Contenedor-tarjetas-padre">
      {/* Modal para cerrar sesión */}
      <Modal show={showModalClose} onHide={() => {
        setShowModalClose(false);
        handleUserActivity(); // Reinicia el proceso al cerrar
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Cerrar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>La sesión expirará pasados 30 segundos si no interactúas.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowModalClose(false); // Cierra el modal
            handleUserActivity(); // Reinicia el temporizador al cerrar
          }}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <h1 className="usuarioName">Bienvenido {userData.name}</h1>

      <div className="Cuentas">
        <ListGroup className="Lista" as="ul">
          <ListGroup.Item as="li" active>
            Cuentas
          </ListGroup.Item>
          <ListGroup.Item as="li" onClick={() => navigate(`/abmBank/ListProducts/accounts/${userData.account1}`)}>
            {userData.account1}
          </ListGroup.Item>
          <ListGroup.Item as="li" onClick={() => navigate(`/abmBank/ListProducts/accounts/${userData.account2}`)}>
            {userData.account2}
          </ListGroup.Item>
        </ListGroup>
      </div>

      <div className="Tarjetas">
        <ListGroup className="Lista" as="ul">
          <ListGroup.Item as="li" active>
            Tarjetas
          </ListGroup.Item>
          <ListGroup.Item as="li" onClick={() => navigate(`/abmBank/ListProducts/cards/${userData.card1}`)}>
            {userData.card1} 
          </ListGroup.Item>
          <ListGroup.Item as="li" onClick={() => navigate(`/abmBank/ListProducts/cards/${userData.card2}`)}>
            {userData.card2}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default ListProductsBank;
