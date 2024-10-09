import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const AccountDetail = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const { AccountData, index } = location.state || {}; 

  useEffect(() => {
  }, [AccountData, index]);

  const account = AccountData ? AccountData[index] : null;

  return (
    <div className="container-Account">
      <h1>Detalle de la Cuenta</h1>
      <p>Número de cuenta: {id}</p>
      <p>Nombre del Titular: {account ? account.titular : 'Cargando...'}</p>
      <p>Límite de Crédito: {account ? account.lim_credito : 'Cargando...'}</p>
      <p>Saldo Actual: {account ? account.Saldo_Actual : 'Cargando...'}</p>
      <p>Estado de la Cuenta: {account ? account.Estado_Cuenta : 'Cargando...'}</p>
    </div>
  );
};

export default AccountDetail;
