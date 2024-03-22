import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

class HeaderDashboard extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home" style={{ textAlign: 'center', width: '100%', marginRight: '250px' }}>Mi Viaje Profesional en Páginas Web Interactivas
                    </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

export default HeaderDashboard;
