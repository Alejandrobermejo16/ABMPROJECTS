import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import GridDataAlejandro from './components/GridDataAlejandro';
// import GridDashboard from './components/GridDashboard';
import { Provider } from 'react-redux';
import store from './store/index';
import InitialDashboard from './screens/InitialDashboard';

function App() {
  return (
    <Provider store={store}> {/* Envuelve la aplicación con el Provider y pasa el store */}
      <div className="App">
        {/* <GridDataAlejandro/> */} {/*si se necesita se volvera a incluir */}
        {/* <GridDashboard/> */} {/*Si se necesita se volverá a incluir */}
        <InitialDashboard/>
      </div>
    </Provider>
  );
}

export default App;

