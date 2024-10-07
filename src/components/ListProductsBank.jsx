import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Asegúrate de importar useLocation
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/ListProductsBank.css";

const ListProductsBank = () => {
  const location = useLocation();
  const { userName } = location.state || {}; // Recupera el DNI

  useEffect(() => {
    console.log(userName);
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
      .then(response => response.json()) // Asegúrate de convertir la respuesta a JSON
      .then(data => {
        console.log("Datos obtenidos:", data);
        // Aquí puedes guardar los datos en el estado (deberías agregar un useState si quieres usarlos)
      })
      .catch(error => {
        console.error("Hubo un problema con la solicitud fetch:", error);
      });
    };

    fetchUserData();
  }, [userName]); // Se ejecuta cuando userName cambia

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


