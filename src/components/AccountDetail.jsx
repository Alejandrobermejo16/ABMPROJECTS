import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";


const AccountDetail = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const { AccountData } = location.state || {};



  useEffect(() => {
    console.log("Account Data:", AccountData);
  }, [AccountData]); 

  return (
    <div className="container-Account">
      <h1>Detalle de la Cuenta</h1>
      <p>Número de cuenta: {id}</p>
       <p>Nombre del Titular: {AccountData ? AccountData.titular : 'Cargando...'}</p>
      <p>Límite de Crédito: {AccountData ? AccountData.lim_credito : 'Cargando...'}</p>
      <p>Saldo Actual: {AccountData ? AccountData.Saldo_Actual : 'Cargando...'}</p>
      <p>Estado de la Cuenta: {AccountData ? AccountData.Estado_Cuenta : 'Cargando...'}</p>
    </div>
  );
};

export default AccountDetail;

