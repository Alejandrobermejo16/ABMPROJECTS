import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

class GaleriaImagenes extends Component {
  render() {
    const { imagenes } = this.props;

    return (
      <Row>
        {imagenes.map((imagen, index) => (
          <Col key={index} sm={6} md={4} lg={3} style={{ paddingTop: '30px' }}>
            <Card>
              <Card.Img variant="top" src={imagen.src} alt={imagen.descripcion} style={{ width: 'inerhit', height: 'auto' }} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default GaleriaImagenes;
