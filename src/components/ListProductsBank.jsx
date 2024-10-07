import React, { useEffect, useState } from "react"; // Asegúrate de importar useState
import { useLocation } from "react-router-dom"; 
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/ListProductsBank.css";

const ListProductsBank = () => {
  const location = useLocation();
  const { userName } = location.state || {}; // Recupera el DNI
  const [products, setProducts] = useState([]); // Estado para almacenar productos

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
        setProducts(data); // Guarda los datos en el estado
      })
      .catch(error => {
        console.error("Hubo un problema con la solicitud fetch:", error);
      });
    };

    if (userName) { // Solo ejecuta si userName está definido
      fetchUserData();
    }
  }, [userName]);

  return (
    <div className="Contenedor-tarjetas-padre">
      <h1 className="usuarioName">Bienvenido {data.name}</h1>

      <div className="Cuentas">
        <ListGroup className="Lista" as="ul">
          <ListGroup.Item as="li" active>
            Cuentas
          </ListGroup.Item>
          {data.map((user, index) => ( 
            <ListGroup.Item as="li" key={index}>
              {user.account1}
              <ListGroup.Item as="li">{user.account1}</ListGroup.Item>

            </ListGroup.Item>

          ))}
        </ListGroup>
      </div>

      <div className="Tarjetas">
        <ListGroup className="Lista" as="ul">
          <ListGroup.Item as="li" active>
            Tarjetas
          </ListGroup.Item>
          {data.map((user, index) => ( 
            <ListGroup.Item as="li" key={index}>
              {user.cardName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default ListProductsBank;


