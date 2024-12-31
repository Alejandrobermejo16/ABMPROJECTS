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
        <li><strong>HTML, CSS y JavaScript:</strong> Desarrollo de interfaces web responsivas y accesibles.</li>
        <li><strong>React (componentes de clase y funcionales):</strong> Creación de aplicaciones dinámicas, mantenibles y escalables.</li>
        <li><strong>Angular (nivel básico):</strong> Conocimientos iniciales en el desarrollo de aplicaciones SPA.</li>
        <li><strong>Testing:</strong> Diseño de pruebas automatizadas para componentes web reutilizables, empleando Vitest para organización y ejecución, y @open-wc/testing para simulación de fixtures y validaciones.</li>
        <li><strong>Otras herramientas y tecnologías:</strong> JIRA, GCP (Google Cloud Platform), GIT, AWS, Bitbucket, Vercel, Node.js, MongoDB, Jenkins, React-Bootstrap, ngx-bootstrap.</li>
        <li><strong>Inteligencia Artificial:</strong> Uso de herramientas como ChatGPT y GitHub Copilot para el desarrollo, mejora de código y búsquedas optimizadas.</li>
        <li><strong>Comunidades y plataformas de aprendizaje:</strong> Stack Overflow y Codewars para la resolución de problemas y mejora continua en programación.</li>
        <li><strong>Prettier:</strong> Formateo consistente y automático de código para mejorar la legibilidad y mantener estándares en los proyectos.</li>
        </ul>
      </section>
      <section className="section-projects">
        <h2 className="section-title">Proyectos Destacados</h2>
        <ul>
          <li><strong>Proyecto Encuestas en Lit:</strong> Sistema para manejar encuestas utilizando LitElement.</li>
          <li><strong>Aplicación de gimnasio:</strong> Gestión de calorías diarias, semanales, anuales.</li>
          <li><strong>Traductor web:</strong> Traducción en tiempo real.</li>
          <li><strong>Banco virtual:</strong> Simulación de tarjetas y cuentas bancarias.</li>
          <li><strong>Reservas Hipica: </strong> Gestión de reservas en una hípica</li>
          <li><strong>School: </strong>Simulación de la experiencia de usuario de Word en Office 365</li>
          <li><strong>Cambio de divisa con Angular: </strong>Sistema de monetizacion</li>
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
