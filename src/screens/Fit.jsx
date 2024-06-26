import React from 'react';
import CalendarioPrincipal from '../helpers/Calendar';
import KalCalculator from '../components/KalCalculator';
import '../styles/Fit.css';

const Fit = () => {
  // const [loadScreen, setLoadScreen] = useState('');

  return (
    <div className='abmfitprincipal'>
      <h1>¡Bienvenido a ABM FIT!</h1>
      <CalendarioPrincipal />
      <KalCalculator cal={70} />
    </div>
  );
}

export default Fit;