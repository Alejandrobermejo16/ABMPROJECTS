import React, { Component } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes desde 'prop-types'
import { Row, Col, Card } from 'react-bootstrap';
import '../styles/GaleriaImagenes.css'; // Asegúrate de importar el archivo CSS donde definiste las clases

class GaleriaImagenes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredIndex: -1,
      imagenvolteadadisable: true,
    };
  }

  handleMouseEnter = (index) => {
    const { imagenes } = this.props;
    const imagen = imagenes[index];
    this.setState({ hoveredIndex: index, imagenvolteadadisable: !imagen.volteada });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredIndex: -1, imagenvolteadadisable: true });
  };

  renderTexto(texto) {
    return (
      <Card.Body>
        <Card.Text>{texto}</Card.Text>
      </Card.Body>
    );
  }

  render() {
    const { imagenes } = this.props;
    const { hoveredIndex, imagenvolteadadisable } = this.state;

    return (
      <Row>
        {imagenes.map((imagen, index) => (
          <Col key={index} sm={6} md={4} lg={3} style={{ paddingTop: '30px' }}>
            <Card
              className={imagen.volteada ? 'tarjeta volteada' : 'tarjeta'}
              onMouseEnter={() => this.handleMouseEnter(index)}
              onMouseLeave={this.handleMouseLeave}
            >
              {imagen.volteada && hoveredIndex === index ? (
                <div className="espacio-imagen">
                  {this.renderTexto(imagen.textoVolteada)}
                </div>
              ) : (
                <Card.Img variant="top" src={imagen.src} alt={imagen.descripcion} style={{ width: '100%', height: 'auto' }} />
              )}

              {imagen.texto && imagen.textoPosicion === 'derecha' && imagenvolteadadisable && this.renderTexto(imagen.texto)}
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

// Define los PropTypes para el componente GaleriaImagenes
GaleriaImagenes.propTypes = {
  imagenes: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired, //se debe de indicar la ruta donde se tiene la imagen como se hace en archivo Constants
    descripcion: PropTypes.string,  //alt de la imagen
    volteada: PropTypes.bool,  //si queremos que se voltee la imagen para ponerle una descripcion detras, false por defecto
    textoVolteada: PropTypes.string, //texto que le ponemos a la imagen que queremos volteada
    texto: PropTypes.string, //texto normal que ponemos a la imagen de principio
    textoPosicion: PropTypes.oneOf(['derecha', 'izquierda']),  //donde queremos que aparezca el texto, por defecto der para que aparezca debajo izq no funciona
  })).isRequired,
};

// Definir valores por defecto para props que son opcionales
GaleriaImagenes.defaultProps = {
  imagenes: [],
};

export default GaleriaImagenes;
