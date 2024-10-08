import React from "react";
import { useParams, useLocation } from "react-router-dom";

function CardDetail() {
  const { id } = useParams(); //se obtiene de los parametros de la url
  const location = useLocation();
  const { userData } = location.state || {}; // Accede a userData si está disponible

  return (
    <div className="container-Card">
      <h1>Detalle de Tarjeta</h1>
      <p>Número de Tarjeta: {id}</p>
      <p>Nombre del titular: {userData ? userData.name : 'Cargando...'}</p>
      <p>Fecha de Vencimiento: {/* Agrega lógica para mostrar fecha */}</p>
      <p>CVV: {/* Lógica para mostrar CVV */}</p>
      <p>Tipo de Tarjeta: {/* Agrega lógica para mostrar tipo de tarjeta */}</p>
      <p>Límite de Crédito: {/* Agrega lógica para mostrar límite */}</p>
      <p>Gasto Actual: {/* Agrega lógica para mostrar gasto actual */}</p>
    </div>
  );
}

export default CardDetail;
