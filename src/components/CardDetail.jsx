import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

function CardDetail() {
  const { id } = useParams(); // se obtiene de los parámetros de la url
  const location = useLocation();
  const { cardData } = location.state || {}; // Accede a cardData si está disponible

  // useEffect para hacer console.log de cardData al montar el componente
  useEffect(() => {
    console.log("Card Data:", cardData);
  }, [cardData]); // Se ejecutará cada vez que cardData cambie


  const card = cardData ? cardData[index] : null;


  return (
    <div className="container-Card">
      <h1>Detalle de Tarjeta</h1>
      <p>Número de Tarjeta: {id}</p>
      <p>Nombre del titular: {card ? card.titular : 'Cargando...'}</p>
      <p>Fecha de Vencimiento: {card ? card.fech_caducidad : 'Cargando...'}</p>
      <p>CVV: {card ? card.CVV : 'Cargando...'}</p>
      <p>Tipo de Tarjeta: {card ? card.typeCard : 'Cargando...'}</p>
      <p>Límite de Crédito: {card ? card.lim_credito : 'Cargando...'}</p>
    </div>
  );
}

export default CardDetail;




