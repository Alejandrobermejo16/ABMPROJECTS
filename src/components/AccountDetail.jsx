import React from "react";
import { useParams } from "react-router-dom";

const AccountDetail = () => {
  const { id } = useParams(); // Obtener el id de la URL

  return (
    <div>
      <h1>Detalle de la Cuenta</h1>
      <p>ID de la cuenta: {id}</p>
      {/* Aquí puedes hacer un fetch para obtener más detalles sobre la cuenta usando el ID */}
    </div>
  );
};

export default AccountDetail;
