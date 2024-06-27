import React from 'react';
import CalendarioPrincipal from '../helpers/Calendar';
import '../styles/Fit.css';
import LoginUserScreen from './LoguinUserScreen';

const Fit = () => {
  return (
    <div className='abmfitprincipal'>
      <h1>¡Bienvenido a ABM FIT!</h1>
      <CalendarioPrincipal />
      <LoginUserScreen/>
    </div>
  );
}

export default Fit;