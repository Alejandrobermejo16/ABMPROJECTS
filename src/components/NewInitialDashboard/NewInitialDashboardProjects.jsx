import React from "react";
import "../../styles/NewInitialDashboardProjects.css";
import Alejandro from "../../img/fotoalejandro.JPG";
import BBVA from "../../img/bbva.png";
import CV from "../../files/CV_Alejandro_Bermejo.pdf";

const NewInitialDashboardProjects = () => {

  //when fire download my CV
  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = CV;
    link.download = "CV_Alejandro_Bermejo.pdf";
    link.click();
  };

  return (
    <div className="divProject">
      <div className="imagen">
        <img src={Alejandro} alt="Foto de Alejandro" />
      </div>
      <p>Alejandro Bermejo Méndez</p>
      
      <div className="presentacion">
        <p>Desarrollador Web Front-End</p>

        <footer>
          <button onClick={downloadCV} className="btn">Descargar CV</button>
        </footer>
      </div>
      <p className="pBBVA">Actualmente en BBVA</p>
      <img className="logoBBVA" src={BBVA} alt="Logo BBVA" />
    </div>
  );
};

export default NewInitialDashboardProjects;
