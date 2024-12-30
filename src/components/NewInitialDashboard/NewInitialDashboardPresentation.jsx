import React from "react";
import "../../styles/NewInitialDashboardPresentation.css";

const NewInitialDashboardPresentation = () => {
  return (
    <div className="presentation-div">
      <header className="header-presentation">Alejandro Bermejo Méndez</header>
      <section className="section-intro">
        <p>
          Bienvenido a mi web, donde quiero compartir contigo mis habilidades,
          proyectos y aprendizajes adquiridos a lo largo de mi trayectoria como
          desarrollador front-end. Mi objetivo principal es crear soluciones
          efectivas y visualmente atractivas, utilizando tecnologías modernas y
          prácticas de desarrollo eficientes.
        </p>
      </section>
      <section className="section-skills">
        <h2 className="section-title">Habilidades</h2>
        <ul>
          <li><strong>HTML, CSS y JavaScript:</strong> Interfaces web responsivas y accesibles.</li>
          <li><strong>React (componentes de clase y funcionales):</strong> Aplicaciones dinámicas y mantenibles.</li>
          <li><strong>LitElement:</strong> Componentes web reutilizables y modulares.</li>
          <li><strong>Lit:</strong> Componentes web reutilizables y modulares.</li>
          <li><strong>Angular (nivel básico):</strong> Experiencia inicial en aplicaciones SPA.</li>
        </ul>
      </section>
      <section className="section-projects">
        <h2 className="section-title">Proyectos Destacados</h2>
        <ul>
          <li><strong>Proyecto Encuestas:</strong> Sistema para manejar encuestas utilizando LitElement.</li>
          <li><strong>Aplicación de gimnasio:</strong> Gestión de calorías diarias y semanales.</li>
          <li><strong>Traductor web:</strong> Traducción en tiempo real.</li>
          <li><strong>Banco virtual:</strong> Simulación de tarjetas y cuentas bancarias.</li>
        </ul>
      </section>
      <section className="section-contact">
        <h2 className="section-title">Filosofía de Desarrollo</h2>
        <p>
          Mi objetivo principal es desarrollar soluciones que cumplan con los
          requisitos técnicos y sean intuitivas y accesibles para los usuarios.
          Creo en la mejora constante y el aprendizaje continuo.
        </p>
        <p className="contact-message">
          Si estás interesado en trabajar conmigo o explorar más sobre mi experiencia, 
          ¡no dudes en <a href="mailto:alejandrobermejomendez170712@gmail.com">ponerte en contacto</a>!
        </p>
      </section>
    </div>
  );
};

export default NewInitialDashboardPresentation;
