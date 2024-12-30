import React from "react";
import "../../styles/NewInitialDashboardProjects.css";
import Alejandro from "../../img/fotoalejandro.JPG";
import BBVA from "../../img/bbva.png";

const NewInitialDashboardProjects = () => {
  return (
    <div className="divProject">
      <div className="imagen">
        <img src={Alejandro} alt="Foto de Alejandro" />
      </div>
      <p>Alejandro Bermejo Méndez</p>
      
      <div className="presentacion">
        <p>Desarrollador Web Front-End</p>

        <footer>
          <button className="btn">Descargar CV</button>
        </footer>
      </div>
      <p className="pBBVA">Actualmente en BBVA</p>
      <img className="logoBBVA" src={BBVA} alt="Foto de Alejandro" />
    </div>
  );
};

export default NewInitialDashboardProjects;
