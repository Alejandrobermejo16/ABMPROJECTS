import React from 'react';
import { Nav, Accordion, Card, Button } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import '../styles/InitialFilter.css';
// Importa los componentes de pantalla aquí
import GridDashboard from './GridDashboard';
import GridDataAlejandro from './GridDataAlejandro';
import ReservasHipica from '../screens/ReservasHipica.jsx';
import Jira from '../screens/Jira.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { LENGUAJESDEPROGRAMACION, FRAMEWORKS, OTROS, LIBRERIAS } from '../Constants.js';
import { List } from 'react-bootstrap-icons';
import { FolderFill, Translate, CalendarDate,  PersonRaisedHand } from 'react-bootstrap-icons';

const ImagenAlejandro = require('../img/Alejandro.jpeg');


class FilterScreens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pantallaActual: null,
            noData: true,
            loadingSkills: false,
            isMenuVisible: false,

        };
    }

    componentDidMount() {
        //para mostrar el menu hamburguesa
        var ancho = document.querySelector('.padrepantallafiltro').clientWidth;
        console.log(ancho);
        if (ancho <= 754) {
            this.setState({ isMenuVisible: true })
        }


    }

    handlePantallaClick = (pantalla) => {
        this.setState({ pantallaActual: pantalla, noData: false });
    };

    cargarSkillsButton = () => {
        this.setState({ loadingSkills: true });
    };
    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuVisible: !prevState.isMenuVisible
        }));
    };




    render() {
        const { pantallaActual, noData, loadingSkills, isMenuVisible } = this.state;

        return (
            <div className='padrepantallafiltro'>
                {!isMenuVisible && (
                    <div className="sidebar">
                        <div className='initialFilterHeader'><p> Explorador de Componentes y Proyectos</p></div>
                        <Nav className="flex-column">
                            <Nav.Link onClick={() => this.handlePantallaClick('GridDashboard')}> <FolderFill /> Agenda de Tareas</Nav.Link>
                            <Nav.Link onClick={() => this.handlePantallaClick('GridDataAlejandro')}>
                                <Translate />
                                Traductor
                            </Nav.Link>
                            <Nav.Link onClick={() => this.handlePantallaClick('ReservasHipica')}><CalendarDate/> ReservasHipica</Nav.Link>
                            <Nav.Link onClick={() => this.handlePantallaClick('Jira')}><PersonRaisedHand/> Entorno colaborativo Tareas</Nav.Link>
                        </Nav>
                        <footer className='initialFilterFooter'>ABM PROJECTS</footer>
                    </div>
                )}


                {isMenuVisible && (
                    <Button variant="primary" onClick={() => this.toggleMenu()} >
                        <List />
                    </Button>
                )}
                {noData ? (
                    <div className="divAcordeon" style={{ marginTop: '5px' }}>
                        <Accordion defaultActiveKey="0" >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>ALEJANDRO BERMEJO MENDEZ</Accordion.Header>
                                <Accordion.Body className="narrowAccordionBody">
                                    <p>
                                        Hola, soy Alejandro, un programador frontend con experiencia en el desarrollo de aplicaciones utilizando React, tanto con componentes de clase como sin el uso de hooks. Mi enfoque se centra en garantizar la estabilidad y eficiencia del código, priorizando una experiencia del usuario excepcional desde el primer clic.
                                    </p>

                                    <p>
                                        Además de mis habilidades técnicas, tengo una fuerte ética de trabajo y un compromiso continuo con el crecimiento profesional. Siempre estoy dispuesto a aprender nuevas tecnologías y metodologías, y estoy constantemente buscando desafíos que me permitan expandir mis habilidades y conocimientos.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '10px' }}>
                            {!loadingSkills ? (
                                <div style={{ marginRight: '20px' }}>
                                    <div style={{ display: 'inline-block', padding: '5px', border: '2px solid yellow', borderRadius: '5px' }}>
                                        <Card style={{ width: '10rem', height: '40%', border: 'none' }}>
                                            <Card.Img variant="top" src={ImagenAlejandro} alt='Imagen del desarrollador de la web' />
                                            <Card.Body >
                                                <Card.Text>
                                                    Desarrollador Front-end en continuo aprendizaje, con ganas de aportar y aprender.
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => this.cargarSkillsButton()}>Skills Profesionales</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            ) : ''}
                            {!loadingSkills ? (
                                <div className='divaviso'>
                                    <ExclamationTriangleFill className='aviso' /> Para poder ver todas las habilidades laborales pulsa el botón de Skills Profesionales
                                </div>
                            ) : ''}

                            {loadingSkills ? (
                                <div className='divSkills'

                                >
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
                                        {/* Map para las barras */}{/*CELL se aplica para cada barra*/}
                                        <Bar dataKey="nivel_Lenguaje">
                                            {
                                                LENGUAJESDEPROGRAMACION.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))
                                            }
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
                                        {/* Map para las barras */}{/*CELL se aplica para cada barra*/}
                                        <Bar dataKey="nivel_FrameWork">
                                            {
                                                FRAMEWORKS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))
                                            }
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
                                        {/* Map para las barras */}{/*CELL se aplica para cada barra*/}
                                        <Bar dataKey="otros">
                                            {
                                                OTROS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))
                                            }
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
                                        {/* Map para las barras */}{/*CELL se aplica para cada barra*/}
                                        <Bar dataKey="nivel_Libreria">
                                            {
                                                LIBRERIAS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))
                                            }
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
                            {pantallaActual === 'GridDashboard' && <GridDashboard />}
                            {pantallaActual === 'GridDataAlejandro' && <GridDataAlejandro />}
                            {pantallaActual === 'ReservasHipica' && <ReservasHipica />}
                            {pantallaActual === 'Jira' && <Jira />}
                        </div>
                    )
                )}

            </div>
        );
    }
}

export default FilterScreens;
