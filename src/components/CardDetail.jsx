import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "../styles/Bank.css";
import { Arrow90degLeft } from "react-bootstrap-icons";

function CardDetail() {
  const { id } = useParams(); // se obtiene de los parámetros de la url
  const location = useLocation();
  const { cardData, index, userName } = location.state || {}; // Se accede a cardData y al índice
  const [theme, setTheme] = useState("cvv-value");
  const [show, setShow] = useState("VER");


  useEffect(() => {}, [cardData]); // Se ejecutará cada vez que cardData cambie

  const card = cardData ? cardData[index] : null;

 const themeValue = (show) => {
  if(show === 'VER'){
    setShow("OCULTAR");
    setTheme("cvv-value-show");
  } else {
    setShow("VER");
    setTheme("cvv-value");
  }
  
 }

  return (
    <div className="container-Card">
      <Link to="/abmBank/ListProducts" state={{ userName }} className="Salir">
        <Arrow90degLeft />
      </Link>

      <div className="card-container">
        <h1 className="card-title">Detalle de Tarjeta</h1>
        <div className="card-info">
          <div className="card-item">
            <strong>Número de Tarjeta:</strong> {id}
          </div>
          <div className="card-item">
            <strong>Nombre del titular:</strong>{" "}
            {card ? card.titular : "Cargando..."}
          </div>
          <div className="card-item">
            <strong>Fecha de Vencimiento:</strong>{" "}
            {card ? card.fech_caducidad : "Cargando..."}
          </div>
          <div className="card-item">
            <strong>CVV:</strong>
            <span className={theme}>{card ? card.CVV : "Cargando..."}</span>
            <button className="boton-cvv" onClick={() => themeValue(show)}>{show}</button>
          </div>
          <div className="card-item">
            <strong>Tipo de Tarjeta:</strong>{" "}
            {card ? card.typeCard : "Cargando..."}
          </div>
          <div className="card-item">
            <strong>Límite de Crédito:</strong>{" "}
            {card ? card.lim_credito : "Cargando..."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
