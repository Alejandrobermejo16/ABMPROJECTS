import React from "react";
import "../styles/Bank.css";
import BankForm from "../components/BankForm";

const Bank = () => {
  return (
    <div className="PantallaRegistroBanco">
      <p className="Parrafo">Bienvenido/a ABM BANK</p>
      <BankForm/>
    </div>
  );
};

export default Bank;
