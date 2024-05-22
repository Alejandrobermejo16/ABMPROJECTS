import React, { Component } from 'react';
import '../styles/Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    // Creamos una referencia para el elemento del mapa
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // Asegúrate de que L (Leaflet) está disponible en el ámbito global
    const L = window.L;

    // Obtener el elemento del mapa utilizando la referencia
    const mapContainer = this.mapRef.current;

    // Inicializar el mapa y establecer su tamaño
    this.map = L.map(mapContainer).setView([40.5522, -3.6239], 13);

    // Agregar un TileLayer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Agregar un marcador
    L.marker([40.5522, -3.6239]).addTo(this.map)
      .bindPopup('San Sebastián de los Reyes, Dehesa Boyal')
      .openPopup();
  }

  componentWillUnmount() {
    // Limpiar el mapa cuando el componente se desmonta
    if (this.map) {
      this.map.remove();
    }
  }

  render() {
    return (
      <div ref={this.mapRef} id="map">
        
      </div>
    );
  }
}

export default Map;
