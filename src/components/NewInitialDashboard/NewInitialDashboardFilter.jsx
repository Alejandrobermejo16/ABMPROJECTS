import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado e importado
import { Translate, CalendarDate, PersonRaisedHand, CreditCard, Backpack } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngular } from "@fortawesome/free-brands-svg-icons";
import { BoxArrowUpRight } from "react-bootstrap-icons";

const NewInitialDashboardFilter = () => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Link as={Link} to="/fit" className="nav-links">
        <PersonRaisedHand /> Espacio Fit
      </Nav.Link>
      <Nav.Link as={Link} to="/translate" className="nav-links">
        <Translate /> Traductor
      </Nav.Link>
      
      <Nav.Link as={Link} to="/reservas" className="nav-links">
        <CalendarDate /> Reservas Hípica
      </Nav.Link>
      <Nav.Link as={Link} to="/newPanel" className="nav-links">
        <CalendarDate /> New Panel
      </Nav.Link>
      <Nav.Link as={Link} to="/abmBank/login" className="nav-links">
        <CreditCard /> Banco
      </Nav.Link>
      <Nav.Link as={Link} to="/abmBank/school" className="nav-links">
        <Backpack /> School
      </Nav.Link>
      <Nav.Link
        className="nav-links"
        href="https://abm-survey-lit-element.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#05B1F5" }}
      >
        <BoxArrowUpRight /> Lit Abm proyects
      </Nav.Link>
      <Nav.Link
        className="nav-links"
        href="https://abm-angular-projects.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "red" }}
      >
        <FontAwesomeIcon style={{ color: "red" }} icon={faAngular} /> Creación Componentes Angular
      </Nav.Link>
    </Nav>
  );
};

export default NewInitialDashboardFilter;
