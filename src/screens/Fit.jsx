import React, { Component } from 'react';
import CalendarioPrincipal from '../helpers/Calendar';
import KalCalculator from '../components/KalCalculator';
import '../styles/Fit.css';

class Fit extends Component {
  render() {
    return (
      <div className='abmfitprincipal'>
        <h1>¡Bienvenido a ABM FIT!</h1>
        <CalendarioPrincipal />
        <KalCalculator cal= {70} />
      </div>
    );
  }
}

export default Fit;
