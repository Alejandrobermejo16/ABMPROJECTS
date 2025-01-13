import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import "../styles/InitialFilter.css";
import { Translate, CalendarDate, PersonRaisedHand, CreditCard, Backpack } from "react-bootstrap-icons";
import { faAngular } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Menu extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="initialFilterHeader" style={{ overflowX: 'hidden' }}>
          <p> Explorador de Componentes y Proyectos</p>
        </div>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/fit" className="nav-links">
            <PersonRaisedHand /> Espacio Fit
          </Nav.Link>
          <Nav.Link as={Link} to="/translate" className="nav-links">
            <Translate /> Traductor
          </Nav.Link>
          <Nav.Link as={Link} to="/reservas" className="nav-links">
            <CalendarDate /> Reservas Hipica
          </Nav.Link>
          <Nav.Link as={Link} to="/oldPanel" className="nav-links">
            <CalendarDate /> Old Panel
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
            <BoxArrowUpRight /> Creación Componentes Propios Lit element
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
      </div>
    );
  }
}

export default Menu;
