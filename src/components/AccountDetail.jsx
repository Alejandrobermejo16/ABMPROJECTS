import React, {useEffect} from "react";
import { useParams, useLocation } from "react-router-dom";


const AccountDetail = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const { userData } = location.state || {}; // Accede a userData si está disponible


  useEffect(() => {
    // Log para verificar el valor de `id`
    console.log("ID de la cuenta:", id);
    // Log para verificar el contenido de `userData`
    console.log("Datos del usuario:", userData);
  }, [id, userData]); // Dependencias para ejecutar el efecto cuando cambien

  return (
    <div className="container-Account">
      <h1>Detalle de la Cuenta</h1>
      <p>Número de cuenta: {id}</p>
      <p>Nombre del Titular: {userData ? userData.name : 'Cargando...'}</p>
      <p>Límite de Crédito: {/* Lógica para mostrar límite de crédito */}</p>
      <p>Saldo Actual: {/* Lógica para mostrar saldo */}</p>
      <p>Estado de la Cuenta: {/* Lógica para mostrar estado */}</p>
    </div>
  );
};

export default AccountDetail;

