import React from "react";
import { Nav, Accordion, Card, Button } from "react-bootstrap";
import { ExclamationTriangleFill, BoxArrowUpRight } from "react-bootstrap-icons";
import "../styles/InitialFilter.css";
import GridDashboard from "./GridDashboard";
import TranslateComponent from "./translateComponent.jsx";
import ReservasHipica from "../screens/ReservasHipica.jsx";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { LENGUAJESDEPROGRAMACION, FRAMEWORKS, OTROS, LIBRERIAS } from "../Constants.js";
import { List } from "react-bootstrap-icons";
import {  Translate, CalendarDate, PersonRaisedHand } from "react-bootstrap-icons";
import LoginUserScreen from "../screens/LoguinUserScreen.jsx";
import { faAngular } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ImagenAlejandro = require("../img/Alejandro.jpeg");

class FilterScreens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pantallaActual: null,
      noData: true,
      loadingSkills: false,
      isMenuVisible: false, // Valor inicial del menú hamburguesa
      isMobile: false, // Estado para saber si es móvil
    };
    this.pantallaFiltroRef = React.createRef();
  }

  componentDidMount() {
    this.updateMenuVisibility();
    window.addEventListener('resize', this.updateMenuVisibility);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMenuVisibility);
  }

  updateMenuVisibility = () => {
    if (this.pantallaFiltroRef.current) {
      const isMobile = this.pantallaFiltroRef.current.clientWidth <= 754;
      this.setState({ 
        isMenuVisible: isMobile ? this.state.isMenuVisible : true, // Muestra el menú si es grande
        isMobile: isMobile 
      });
    }
  };

  handlePantallaClick = (pantalla) => {
    this.setState({ pantallaActual: pantalla, noData: false });

    if (this.state.isMobile) {
      this.setState({ isMenuVisible: false });
    }
  };

  cargarSkillsButton = () => {
    this.setState({ loadingSkills: true })};

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuVisible: !prevState.isMenuVisible,
    }));
  };

  render() {
    const { pantallaActual, noData, loadingSkills, isMenuVisible, isMobile } = this.state;

    return (
      <div className="padrepantallafiltro" ref={this.pantallaFiltroRef}>
        {isMobile && !isMenuVisible && (
          <Button variant="primary" onClick={() => this.toggleMenu()}>
            <List />
          </Button>
        )}
        
        {(isMenuVisible || !isMobile) && (
          <div className="sidebar">
            <div className="initialFilterHeader" style={{overflowX: 'hidden'}}>
              <p> Explorador de Componentes y Proyectos</p>
            </div>
            <Nav className="flex-column">
              {/* <Nav.Link className="nav-links" onClick={() => this.handlePantallaClick("GridDashboard")}>
                <FolderFill /> Agenda de Tareas
              </Nav.Link> */}
              <Nav.Link className="nav-links" onClick={() => this.handlePantallaClick("Fit")}>
                <PersonRaisedHand /> Espacio Fit
              </Nav.Link>
              <Nav.Link className="nav-links" onClick={() => this.handlePantallaClick("TranslateComponent")}>
                <Translate /> Traductor
              </Nav.Link>
              <Nav.Link className="nav-links" onClick={() => this.handlePantallaClick("ReservasHipica")}>
                <CalendarDate /> Reservas Hipica
              </Nav.Link>
              
              <Nav.Link
                className="nav-links"
                href="https://abm-survey-lit-element.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#05B1F5" }}
              >
                <BoxArrowUpRight /> Creacion Componentes Propios Lit element
              </Nav.Link>
              <Nav.Link
                className="nav-links"
                href="https://abm-angular-projects.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "red" }}
              >
                <FontAwesomeIcon style={{ color: "red" }} icon={faAngular} /> Creacion Componentes
                Angular
              </Nav.Link>
            </Nav>
          </div>
        )}

        {noData ? (
          <div className="divAcordeon" style={{ marginTop: "5px" }}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>ALEJANDRO BERMEJO MENDEZ</Accordion.Header>
                <Accordion.Body className="narrowAccordionBody">
                  <p>
                    Hola, soy Alejandro, un programador frontend con experiencia
                    en el desarrollo de aplicaciones utilizando React, tanto con
                    componentes de clase como sin el uso de hooks. Mi enfoque se
                    centra en garantizar la estabilidad y eficiencia del código,
                    priorizando una experiencia del usuario excepcional desde el
                    primer clic.
                  </p>
                  <p>
                    Además de mis habilidades técnicas, tengo una fuerte ética
                    de trabajo y un compromiso continuo con el crecimiento
                    profesional. Siempre estoy dispuesto a aprender nuevas
                    tecnologías y metodologías, y estoy constantemente buscando
                    desafíos que me permitan expandir mis habilidades y
                    conocimientos.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "10px",
              }}
            >
              {!loadingSkills ? (
                <div style={{ marginRight: "20px" }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "5px",
                      border: "2px solid yellow",
                      borderRadius: "5px",
                    }}
                  >
                    <Card
                      style={{ width: "10rem", height: "40%", border: "none" }}
                    >
                      <Card.Img
                        variant="top"
                        src={ImagenAlejandro}
                        alt="Imagen del desarrollador de la web"
                      />
                      <Card.Body>
                        <Card.Text>
                          Desarrollador Front-end en continuo aprendizaje, con
                          ganas de aportar y aprender.
                        </Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => this.cargarSkillsButton()}
                        >
                          Skills Profesionales
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              ) : (
                ""
              )}
              {!loadingSkills ? (
                <div className="divaviso" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontSize: '25px'  }}>
                  <ExclamationTriangleFill className="aviso" style={{marginRight: '10px', fontSize: '30px' }}/> Para poder ver
                  todas las habilidades laborales pulsa el botón de Skills
                  Profesionales (la aplicacion tambien funcionará en dispositivos moviles)
                </div>
              ) : (
                ""
              )}

              {loadingSkills ? (
                <div className="divSkills">
                  <BarChart
                    width={600}
                    height={300}
                    data={LENGUAJESDEPROGRAMACION}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="nivel_Lenguaje">
                      {LENGUAJESDEPROGRAMACION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>

                  <BarChart
                    width={600}
                    height={300}
                    data={FRAMEWORKS}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="nivel_FrameWork">
                      {FRAMEWORKS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>

                  <BarChart
                    width={600}
                    height={300}
                    data={OTROS}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="otros">
                      {OTROS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>

                  <BarChart
                    width={600}
                    height={300}
                    data={LIBRERIAS}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="nivel_Libreria">
                      {LIBRERIAS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          pantallaActual && (
            <div>
              {/* Renderiza el componente de pantalla actual */}
              {pantallaActual === "GridDashboard" && <GridDashboard />}
              {pantallaActual === "TranslateComponent" && <TranslateComponent />}
              {pantallaActual === "ReservasHipica" && <ReservasHipica />}
              {pantallaActual === "Fit" && <LoginUserScreen />}
            </div>
          )
        )}
      </div>
    );
  }
}

export default FilterScreens;
