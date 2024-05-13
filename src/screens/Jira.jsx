import React, { Component } from 'react';
import LiveSearchContainer from '../components/LiveSearchContainer';

class Jira extends Component {
  constructor(props) {
    super(props);
    // Aquí puedes inicializar el estado si es necesario
     this.state = {  };
  }

  // Ciclo de vida: Montaje
  componentDidMount() {
    // Lógica a ejecutar después de que el componente se monta en el DOM
  }

  // Ciclo de vida: Actualización
  componentDidUpdate(prevProps, prevState) {
    // Lógica a ejecutar después de que el componente se actualiza
  }

  // Ciclo de vida: Desmontaje
  componentWillUnmount() {
    // Lógica a ejecutar antes de que el componente se desmonte del DOM
  }

  // Ciclo de vida: Captura de errores
  componentDidCatch(error, info) {
    // Lógica para manejar errores en componentes secundarios
  }

  render() {
    return (
      <div>
        <LiveSearchContainer/>
      </div>
    );
  }
}

// Exportación del componente
export default Jira;
