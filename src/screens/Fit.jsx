import React from 'react';
import CalendarioPrincipal from '../helpers/Calendar';
import '../styles/Fit.css';
import KalCalculator from '../components/KalCalculator';

const Fit = () => {
  return (
    <div className='abmfitprincipal'>
      <h1>¡Bienvenido a ABM FIT!</h1>
      <CalendarioPrincipal />
      <KalCalculator/>
    </div>
  );
}

export default Fit;