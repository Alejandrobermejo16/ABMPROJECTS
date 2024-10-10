import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/ListProductsBank.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { protectedShow } from '../Constants';

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
        body: JSON.stringify({ dni: userName }),
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

  const closeSession = useCallback(() => {
    setShowModalClose(false);
    setUserData(null);
    navigate('/abmBank/login');
  }, [navigate]); // Asegúrate de que navigate esté en las dependencias

  const handleUserActivity = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (modalTimeoutRef.current) {
      clearTimeout(modalTimeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowModalClose(true);
      modalTimeoutRef.current = setTimeout(() => {
        closeSession();
      }, 30000);
    }, 270000);
  }, [closeSession]); // Añadir closeSession a las dependencias

  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    handleUserActivity();

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(modalTimeoutRef.current);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [handleUserActivity]); // handleUserActivity ya está en las dependencias

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
              clearTimeout(modalTimeoutRef.current); 
              handleUserActivity(); 
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
          {userData.Accounts.map((account, index) => (
            <ListGroup.Item 
              key={index} 
              as="li" 
              onClick={() => {
                navigate(`/abmBank/ListProducts/accounts/${account.num_cuenta}`, { state: { AccountData: userData.Accounts, index, userName: userName } });
              }}>
              <div className="account-details">
                <span className="account-number">{protectedShow(account.num_cuenta)}</span>
                <span className="account-balance">{account.Saldo_Actual}</span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="Tarjetas">
        <ListGroup className="Lista" as="ul">
          <ListGroup.Item as="li" active>
            Tarjetas
          </ListGroup.Item>
          {userData.Cards.map((card, index) => (
            <ListGroup.Item 
              key={index} 
              as="li" 
              onClick={() => {
                navigate(`/abmBank/ListProducts/cards/${card.num_tarjeta}`, { state: { cardData: userData.Cards, index, userName: userName } });
              }}>
              <div className="account-details">
                <span className="account-number">{card.num_tarjeta}</span>
                <span className="account-balance">{card.Saldo_Actual}</span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default ListProductsBank;

