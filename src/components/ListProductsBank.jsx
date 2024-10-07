import React, { useState } from "react";
import "../styles/ListProductsBank.css";
import ListGroup from "react-bootstrap/ListGroup";

const ListProductsBank = ({ userName }) => {

  const DataUser = () => {

    let user = userName;

    fetch("https://backendabmprojects.vercel.app/api/users/productsUserBank")
      .then((response) => {
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Convertir la respuesta en JSON
        return response.json();
      })
      .then((data) => {
        // Manejar los datos recibidos
        console.log("Datos obtenidos:", data);
      })
      .catch((error) => {
        // Manejar cualquier error que ocurra
        console.error("Hubo un problema con la solicitud fetch:", error);
      });
  };

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
