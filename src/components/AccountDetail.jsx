import React from "react";
import { useParams } from "react-router-dom";

const AccountDetail = () => {
  const { id } = useParams(); // Obtener el id de la URL

  return (
    <div className="container-Account">
      <h1>Detalle de la Cuenta</h1>
      <p>Numero de cuenta: {id}</p>
      <p>Nombre del Titular:</p>
      <p>Límite de Crédito:</p>
      <p>Saldo Actual:</p>
      <p>Estado de la Cuenta</p>
      {/* Aquí puedes hacer un fetch para obtener más detalles sobre la cuenta usando el ID */}
    </div>
  );
};

export default AccountDetail;
