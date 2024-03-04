//Creacion de un store


import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ReducerMaster from './reducers/ReducerMaster'; //Tiene todos los reducers
import SagaMaster from './sagas/SagaMaster'; //Tiene todos los sagas

// Crea el middleware de saga
const sagaMiddleware = createSagaMiddleware();

// Crea la tienda (store) combinando el reducer y aplicando el middleware de saga
const store = createStore(
  ReducerMaster,
  applyMiddleware(sagaMiddleware)
);

// Ejecuta la saga que tiene todas las sagas a la escucha
sagaMiddleware.run(SagaMaster);

export default store;
