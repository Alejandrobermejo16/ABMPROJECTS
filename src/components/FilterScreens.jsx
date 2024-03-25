import React from 'react';
import { Nav, Accordion, Card, Button } from 'react-bootstrap';
import '../styles/InitialFilter.css';
// Importa los componentes de pantalla aquí
import GridDashboard from './GridDashboard';
import GridDataAlejandro from './GridDataAlejandro';
const ImagenAlejandro = require('../img/Alejandro.jpeg');

class FilterScreens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pantallaActual: null,
      noData: true,
      loadingSkills: false,
    };
  }

  handlePantallaClick = (pantalla) => {
    this.setState({ pantallaActual: pantalla, noData: false });
  };

  cargarSkillsButton = () => {
    this.setState({ loadingSkills: true });
  };

  render() {
    const { pantallaActual, noData, loadingSkills } = this.state;

    return (
      <div style={{ display: 'flex' }}>
        <div className="sidebar">
          <div className='initialFilterHeader'><p>Explorador de Componentes y Proyectos</p></div>
          <Nav className="flex-column">
            <Nav.Link onClick={() => this.handlePantallaClick('GridDashboard')}>Tabla de Actividades</Nav.Link>
            <Nav.Link onClick={() => this.handlePantallaClick('GridDataAlejandro')}>Aleatorio</Nav.Link>
            <Nav.Link onClick={() => this.handlePantallaClick('pantalla3')}>Pantalla 3</Nav.Link>
          </Nav>
        </div>
        {noData ? (
          <div style={{ marginTop: '20px' }}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginRight: '20px' }}>
                <div style={{ display: 'inline-block', padding: '5px', border: '2px solid yellow', borderRadius: '5px' }}>
                  <Card style={{ width: '10rem', height: '20%', border: 'none' }}>
                    <Card.Img variant="top" src={ImagenAlejandro} alt='Imagen del desarrollador de la web' />
                    <Card.Body >
                      <Card.Title>Alejandro Bermejo Mendez</Card.Title>
                      <Card.Text>
                        Desarrollador Front-end en continuo aprendizaje, con ganas de aportar y aprender.
                      </Card.Text>
                      <Button variant="primary" onClick={() => this.cargarSkillsButton()}>Skills Profesionales</Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              {loadingSkills ? 'prueba' : null}
            </div>
          </div>
        ) : (
          pantallaActual && (
            <div>
              {/* Renderiza el componente de pantalla actual */}
              {pantallaActual === 'GridDashboard' && <GridDashboard />}
              {pantallaActual === 'GridDataAlejandro' && <GridDataAlejandro />}
            </div>
          )
        )}
            </div>
        );
    }
}

export default FilterScreens;
