import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderDashboard from './components/HeaderDashboard';
import GridDataAlejandro from './components/GridDataAlejandro';
import GridDashboard from './components/GridDashboard';
import { Provider } from 'react-redux';
import store from './store/index';


function App() {
  return (
    <Provider store={store}> {/* Envuelve la aplicación con el Provider y pasa el store */}
      <div className="App">
        <HeaderDashboard/>
        <GridDataAlejandro/>
        <GridDashboard/>
      </div>
    </Provider>
  );
}

export default App;

