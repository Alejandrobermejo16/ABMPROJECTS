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

  return (
    <div className="container-Card">
      <h1>Detalle de Tarjeta</h1>
      <p>Número de Tarjeta: {id}</p>
      <p>Nombre del titular: {cardData ? cardData.name : 'Cargando...'}</p>
      <p>Fecha de Vencimiento: {cardData ? cardData.fech_caducidad : 'Cargando...'}</p>
      <p>CVV: {cardData ? cardData.CVV : 'Cargando...'}</p>
      <p>Tipo de Tarjeta: {cardData ? cardData.typeCard : 'Cargando...'}</p>
      <p>Límite de Crédito: {cardData ? cardData.lim_credito : 'Cargando...'}</p>
    </div>
  );
}

export default CardDetail;

