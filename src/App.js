import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderDashboard from './components/Header';
import GridDataAlejandro from './components/GridDataAlejandro';
import GridDashboard from './components/GridDashboard';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import SagaMaster from './store/sagas/SagaMaster';
import rootReducer from './store/reducers/ReducerMaster';

// Crea el middleware de Redux Saga
const sagaMiddleware = createSagaMiddleware();

// Crea el store de Redux con el middleware de Saga
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Ejecuta la saga principal
sagaMiddleware.run(SagaMaster); 

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

