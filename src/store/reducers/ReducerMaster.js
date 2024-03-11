// reducers/index.js
import { combineReducers } from 'redux';
import columnRandomReducer from './fetchColumnAleatorio';
import taskReducer from './task'
// Importa otros reductores si los tienes

// Combina todos los reductores en un solo reductor raíz
const ReducerMaster = combineReducers({
 
    columnRandomReducer,
    taskReducer,

});

export default ReducerMaster;
