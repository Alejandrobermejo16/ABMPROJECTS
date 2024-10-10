import React, { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import '../styles/Bank.css';
import { Arrow90degLeft } from "react-bootstrap-icons";

const AccountDetail = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const { AccountData, index, userName } = location.state || {}; 

  useEffect(() => {
  }, [AccountData, index]);

  const account = AccountData ? AccountData[index] : null;

  return (
    <div className="container-padre-account">
      <Link 
        to="/abmBank/ListProducts" 
        state={{ 
          userName 
        }} 
        className="Salir"
      >
        <Arrow90degLeft />
      </Link>
      <div className="account-container">
        <h1 className="detalle">Detalle de la Cuenta</h1>
        <div className="account-info">
          <div className="account-item">
            <strong>Número de cuenta:</strong> {id}
          </div>
          <div className="account-item">
            <strong>Límite de Crédito:</strong> {account ? account.lim_credito : 'Cargando...'}
          </div>
          <div className="account-item">
            <strong>Saldo Actual:</strong> {account ? account.Saldo_Actual : 'Cargando...'}
          </div>
          <div className="account-item">
            <strong>Estado de la Cuenta:</strong> {account ? account.Estado_Cuenta : 'Cargando...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
