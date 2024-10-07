import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/ListProductsBank.css";

const ListProductsBank = () => {
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
        setUserData(data); // Cambiar a setUserData
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
          {userData.map((account, index) => ( // Asegúrate de que 'accounts' sea un array en tu API
            <ListGroup.Item as="li" key={index}>
              {account.name} {/* Cambia 'account.name' por la propiedad correcta */}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="Tarjetas">
        <ListGroup className="Lista" as="ul">
          <ListGroup.Item as="li" active>
            Tarjetas
          </ListGroup.Item>
          {userData.map((card, index) => ( // Asegúrate de que 'cards' sea un array en tu API
            <ListGroup.Item as="li" key={index}>
              {card.cardName} {/* Cambia 'card.cardName' por la propiedad correcta */}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default ListProductsBank;


