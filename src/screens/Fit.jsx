import React, { Component } from 'react';
import CalendarioPrincipal from '../helpers/Calendar';
import '../styles/Fit.css';

class Fit extends Component {
  render() {
    return (
      <div className='abmfitprincipal'>
        <h1>¡Bienvenido a ABM FIT!</h1>
        <CalendarioPrincipal />
      </div>
    );
  }
}

export default Fit;
