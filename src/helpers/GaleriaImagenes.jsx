import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import '../styles/GaleriaImagenes.css';

class GaleriaImagenes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredIndex: -1,
      imagenvolteadadisable: true,
      isMobile: window.innerWidth <= 767,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this); //  para que handleClickOutside tenga acceso al contexto del componente
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('click', this.handleClickOutside); // para los clics fuera de la tarjeta en movil
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('click', this.handleClickOutside);
  }
// Restablece el estado de la tarjeta
  handleClickOutside(event) {
    if (!this.cardRef.contains(event.target)) { 
      this.setState({ hoveredIndex: -1, imagenvolteadadisable: true }); 
    }
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth <= 767 });
  };

  handleClick = (index) => {
    const { imagenes } = this.props;
    const imagen = imagenes[index];
    const { isMobile } = this.state;
    if (isMobile) {
      this.setState({ hoveredIndex: index, imagenvolteadadisable: !imagen.volteada });
    }
  };

  handleMouseEnter = (index) => {
    const { imagenes } = this.props;
    const imagen = imagenes[index];
    const { isMobile } = this.state;
    if (!isMobile) {
      this.setState({ hoveredIndex: index, imagenvolteadadisable: !imagen.volteada });
    }
  };

  handleMouseLeave = () => {
    const { isMobile } = this.state;
    if (!isMobile) {
      this.setState({ hoveredIndex: -1, imagenvolteadadisable: true });
    }
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
    const { hoveredIndex, imagenvolteadadisable, isMobile } = this.state;

    return (
      <Row>
        {imagenes.map((imagen, index) => (
          <Col key={index} sm={6} md={4} lg={3} style={{ paddingTop: '30px' }}>
            <Card
              className={imagen.volteada ? 'tarjeta volteada' : 'tarjeta'}
              onMouseEnter={() => this.handleMouseEnter(index)}
              onMouseLeave={this.handleMouseLeave}
              onClick={() => this.handleClick(index)}
              ref={(ref) => { this.cardRef = ref; }} // Añade una referencia a la tarjeta para poder comprobar si el clic fue dentro o fuera de ella
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

GaleriaImagenes.propTypes = {
  imagenes: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    volteada: PropTypes.bool,
    textoVolteada: PropTypes.string,
    texto: PropTypes.string,
    textoPosicion: PropTypes.oneOf(['derecha', 'izquierda']),
  })).isRequired,
};

GaleriaImagenes.defaultProps = {
  imagenes: [],
};

export default GaleriaImagenes;
