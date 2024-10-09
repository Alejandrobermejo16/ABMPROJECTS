import React from "react";
import { useParams, useLocation } from "react-router-dom";

function CardDetail() {
  const { id } = useParams(); //se obtiene de los parametros de la url
  const location = useLocation();
  const { cardData } = location.state || {}; // Accede a cardData si está disponible


  

  return (
    <div className="container-Card">
      <h1>Detalle de Tarjeta</h1>
      <p>Número de Tarjeta: {id}</p>
      <p>Nombre del titular: {cardData ? cardData.name : 'Cargando...'}</p>
      <p>Fecha de Vencimiento: {cardData ? cardData.Cards[0].fech_caducidad : 'Cargando...'}</p>
      <p>CVV: {cardData ? cardData.Cards[0].CVV : 'Cargando...'}</p>
      <p>Tipo de Tarjeta: {cardData ? cardData.Cards[0].typeCard : 'Cargando...'}</p>
      <p>Límite de Crédito: {cardData ? cardData.Cards[0].lim_credito : 'Cargando...'}</p>
    </div>
  );
}

export default CardDetail;
