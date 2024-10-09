import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";


const AccountDetail = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const { userData } = location.state || {};



  // useEffect para hacer console.log de cardData al montar el componente
  useEffect(() => {
    console.log("Card Data:", userData);
  }, [userData]); // Se ejecutará cada vez que cardData cambie


  return (
    <div className="container-Account">
      <h1>Detalle de la Cuenta</h1>
      <p>Número de cuenta: {id}</p>
      {/* <p>Nombre del Titular: {AccountData ? AccountData.name : 'Cargando...'}</p> */}
      <p>Límite de Crédito: {/* Lógica para mostrar límite de crédito */}</p>
      <p>Saldo Actual: {/* Lógica para mostrar saldo */}</p>
      <p>Estado de la Cuenta: {/* Lógica para mostrar estado */}</p>
    </div>
  );
};

export default AccountDetail;

