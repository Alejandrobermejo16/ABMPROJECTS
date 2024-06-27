import React from 'react';
import CalendarioPrincipal from '../helpers/Calendar';
import '../styles/Fit.css';

const Fit = () => {
  return (
    <div className='abmfitprincipal'>
      <h1>¡Bienvenido a ABM FIT!</h1>
      <CalendarioPrincipal />
    </div>
  );
}

export default Fit;