import React, { Component } from 'react';
import CalendarioPrincipal from '../helpers/Calendar';

class Fit extends Component {
  render() {
    return (
      <div>
        <h1>¡Bienvenido a ABM FIT!</h1>
        <CalendarioPrincipal /> {/* Incluye el componente de calendario */}
      </div>
    );
  }
}

export default Fit;
