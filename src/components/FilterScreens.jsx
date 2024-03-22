import React from 'react';
import { Nav } from 'react-bootstrap';
import '../styles/InitialFilter.css';

// Importa los componentes de pantalla aquí
import GridDashboard from './GridDashboard';
import GridDataAlejandro from './GridDataAlejandro';

class FilterScreens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pantallaActual: null
        };
    }

    handlePantallaClick = (pantalla) => {
        this.setState({ pantallaActual: pantalla });
    }

    render() {
        const { pantallaActual } = this.state;

        return (
            <div style={{ display: 'flex' }}>
                <div className="sidebar" >
                    <div className='initialFilterHeader'><h2>Filtro</h2></div>
                    <Nav className="flex-column">
                        <Nav.Link onClick={() => this.handlePantallaClick('GridDashboard')}>Tabla de Actividades</Nav.Link>
                        <Nav.Link onClick={() => this.handlePantallaClick('GridDataAlejandro')}>Aleatorio</Nav.Link>
                        <Nav.Link onClick={() => this.handlePantallaClick('pantalla3')}>Pantalla 3</Nav.Link>
                    </Nav>
                </div>
                <div>
                    {/* Renderiza el componente de pantalla actual */}
                    {pantallaActual === 'GridDashboard' && <GridDashboard />}
                    {pantallaActual === 'GridDataAlejandro' && <GridDataAlejandro />}
                </div>
            </div>
        );
    }
}

export default FilterScreens;
