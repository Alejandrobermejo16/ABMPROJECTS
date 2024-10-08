import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/ListProductsBank.css";

const ListProductsBank = () => {
  const navigate = useNavigate();  
  const location = useLocation();
  const { userName } = location.state || {}; // Recupera el DNI
  const [userData, setUserData] = useState(null); // Estado para almacenar productos

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
        setUserData(data.data); // Guardar el objeto directamente
        console.log(data); // Cambié response a data
      })
      .catch(error => {
        console.error("Hubo un problema con la solicitud fetch:", error);
      });
    };

    if (userName) { // Solo ejecuta si userName está definido
      fetchUserData();
    }
  }, [userName]);

  // Verifica que userData no sea null
  if (!userData) {
    return <div>Cargando...</div>; // Puedes mostrar un mensaje de carga
  }
  return (
    <div className="Contenedor-tarjetas-padre">
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
