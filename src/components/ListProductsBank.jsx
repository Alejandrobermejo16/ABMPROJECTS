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
  const [AccountData, setAccountData] = useState(null);

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

  const closeSession = () => {
    setShowModalClose(false);
    setUserData(null);
    navigate('/abmBank/login');
  };


  const dataForAccountOrCard = (type, objeto) => {
    let filtrado; 

    if (type === 'account1') {
        console.log(objeto);
        filtrado = objeto.Cards.filter(numaccount => numaccount.num_tarjeta === objeto.Accounts[0].num_cuenta);
        setAccountData(filtrado);
    }
        else if (type === 'account2') {
          filtrado = objeto.Accounts.filter(numaccount => numaccount.num_tarjeta === objeto.Accounts[1].num_cuenta);
          setAccountData(filtrado);
    } else if (type === 'card1') {
        filtrado = objeto.Accounts.filter(numcard => numcard.num_tarjeta === objeto.Cards[0].num_tarjeta);
        setAccountData(filtrado);
    } 
    else if (type === 'card2') {
      filtrado = objeto.Accounts.filter(numcard => numcard.num_tarjeta === objeto.Cards1[0].num_tarjeta);
      setAccountData(filtrado);
  }
  else {
        return []; 
    }

    return filtrado; 
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
      modalTimeoutRef.current = setTimeout(() => {
        closeSession();
      }, 30000);
    }, 270000);
  };

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
          <ListGroup.Item 
            as="li" 
            onClick={() => {
              const AccountData = dataForAccountOrCard('account1', userData);
              console.log(AccountData);
              navigate(`/abmBank/ListProducts/accounts/${userData.Accounts[0].num_cuenta}`, { state: { AccountData } });
            }}>            {protectedShow(userData.Accounts[0].num_cuenta)}
          
          {protectedShow(userData?.Accounts[0]?.num_cuenta)}
          </ListGroup.Item>
          <ListGroup.Item 
            as="li" 
            onClick={() => {
              const AccountData = dataForAccountOrCard('account2', userData); // Llama a la función para obtener los datos de la tarjeta
              setUserData(AccountData);
              navigate(`/abmBank/ListProducts/accounts/${userData.Accounts[1].num_cuenta}`, { state: { userData } });
            }}>            {protectedShow(userData.Accounts[1].num_cuenta)}
          </ListGroup.Item>
        </ListGroup>
      </div>

      <div className="Tarjetas">
        <ListGroup className="Lista" as="ul">
          <ListGroup.Item as="li" active>
            Tarjetas
          </ListGroup.Item>
          <ListGroup.Item 
            as="li" 
            onClick={() => {
              const cardData = dataForAccountOrCard('card1', userData); // Llama a la función para obtener los datos de la tarjeta
              navigate(`/abmBank/ListProducts/cards/${userData.Cards[0].num_tarjeta}`, { state: { cardData } });
            }}>
            {userData.Cards[0].num_tarjeta} 
          </ListGroup.Item>
          <ListGroup.Item 
            as="li" 
            onClick={() => {
              const cardData = dataForAccountOrCard('card2', userData); // Llama a la función para obtener los datos de la tarjeta
              navigate(`/abmBank/ListProducts/cards/${userData.Cards[1].num_tarjeta}`, { state: { cardData } });
            }}>            {userData.Cards[1].num_tarjeta}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default ListProductsBank;
