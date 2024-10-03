import React from "react";
import "../styles/Bank.css";
import BankForm from "../components/BankForm";
import { Arrow90degLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import '../styles/Bank.css';

const Bank = () => {
  return (
    <div className="PantallaRegistroBanco">
      <p className="Parrafo">Bienvenido/a ABM BANK</p>
      <Link to="/" className="Salir"> 
        <Arrow90degLeft />
      </Link>
      <BankForm />
    </div>
  );
};

export default Bank;
