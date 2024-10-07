import React, { useState, useEffect } from "react";
import "../styles/ListProductsBank.css";
import ListGroup from "react-bootstrap/ListGroup";

const ListProductsBank = ({ userName }) => {
  const [userData, setUserData] = useState(null); // Cambiado a null para un manejo de estado más claro

  useEffect(() => {
    console.log(userName);
    const fetchUserData = () => {
      // Aquí puedes utilizar userName si es necesario para la solicitud
      fetch('https://backendabmprojects.vercel.app/api/users/productsUserBank', {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json', // Indicar que el contenido es JSON
        },
        body: JSON.stringify({
          dni: userName, 
        })
    })
        .then((data) => {
          // Manejar los datos recibidos
          console.log("Datos obtenidos:", data);
          setUserData(data); // Aquí puedes guardar los datos en el estado
        })
        .catch((error) => {
          // Manejar cualquier error que ocurra
          console.error("Hubo un problema con la solicitud fetch:", error);
        });
    };

    fetchUserData(); // Invocar la función para obtener los datos

  }, [userName]); // Puedes agregar userName a la lista de dependencias si quieres que se ejecute nuevamente cuando cambie

  return (
    <div className="Contenedor-tarjetas-padre">
      <h1 className="usuarioName">Bienvenido Alejandro{userName}</h1>

      <div className="Cuentas">
        <ListGroup className="Lista" as="ul">
          <ListGroup.Item as="li" active>
            Cuentas
          </ListGroup.Item>
          <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item as="li" disabled>
            Morbi leo risus
          </ListGroup.Item>
          <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
        </ListGroup>
      </div>
      <div className="Tarjetas">
        <ListGroup className="Lista" as="ul">
          <ListGroup.Item as="li" active>
            Tarjetas
          </ListGroup.Item>
          <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item as="li" disabled>
            Morbi leo risus
          </ListGroup.Item>
          <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default ListProductsBank;
