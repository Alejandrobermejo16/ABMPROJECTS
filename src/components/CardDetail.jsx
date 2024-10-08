import React from "react";
import { useParams } from "react-router-dom";

function CardDetail() {

    const { id } = useParams(); 


    return (
        <div className="container-Card">
        <h1>Hello detalle de tarjeta</h1>
        <p>Numero de Tarjeta:</p>
        <p>Nombre del titular:</p>
        <p>Fecha de Vencimiento</p>
        <p>CVV inventar boton para verlo</p>
        <p>Tipo de Tarjeta VISA MASTERCARD ETC</p>
        <p>Límite de Credito</p>
        <p>Gasto Actual</p>
        </div>
    );
}

export default CardDetail;