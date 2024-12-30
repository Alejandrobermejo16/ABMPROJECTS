import React, { useState, useEffect, useRef } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { Translate, CalendarDate, PersonRaisedHand, CreditCard, Backpack, BoxArrowUpRight } from "react-bootstrap-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import '../../styles/NewInitialDashboardFilter.css';

const NewInitialDashboardFilter = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef();

  const updateMenuVisibility = () => {
    if (menuRef.current) {
      const isMobileView = menuRef.current.clientWidth <= 754;
      setIsMobile(isMobileView);
      setIsMenuVisible(!isMobileView);
    }
  };

  useEffect(() => {
    updateMenuVisibility();
    window.addEventListener("resize", updateMenuVisibility);
    return () => window.removeEventListener("resize", updateMenuVisibility);
  }, []);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <div ref={menuRef} className="new-dashboard-filter">
      {isMobile && !isMenuVisible && (
        <Button variant="primary" onClick={toggleMenu} className="toggle-menu-button">
          <List />
        </Button>
      )}

      {(isMenuVisible || !isMobile) && (
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
            <BoxArrowUpRight /> Lit Abm proyect
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
      )}
    </div>
  );
};

export default NewInitialDashboardFilter;
