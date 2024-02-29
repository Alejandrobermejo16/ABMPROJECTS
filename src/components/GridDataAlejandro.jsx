import Container from 'react-bootstrap/Container';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Component } from 'react';

class GridDataAlejandro extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Columna 1</h3>
                        <p>Contenido de la columna 1</p>
                        <p>Contenido de la columna 1</p>
                        <p>Contenido de la columna 1</p>
                        <p>Contenido de la columna 1</p>
                    </Col>
                    <Col>
                        <h3>Columna 2</h3>
                        <p>Contenido de la columna 2</p>
                        <p>Contenido de la columna 2</p>
                        <p>Contenido de la columna 2</p>
                        <p>Contenido de la columna 2</p>
                        
                    </Col>
                    <Col>
                        <h3>Columna 3</h3>
                        <p>Contenido de la columna 3</p>
                        <p>Contenido de la columna 3</p>
                        <p>Contenido de la columna 3</p>
                        <p>Contenido de la columna 3</p>

                    </Col>
                    <Col>
                        <h3>Columna 4</h3>
                        <p>Contenido de la columna 4</p>
                        <p>Contenido de la columna 4</p>
                        <p>Contenido de la columna 4</p>
                        <p>Contenido de la columna 4</p>

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default GridDataAlejandro;
