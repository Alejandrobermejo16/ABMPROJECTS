// reducers/index.js
import { combineReducers } from 'redux';
import columnRandomReducer from './fetchColumnAleatorio';
import taskReducer from './task';
import SendMailReducer from './sendMails';
// Importa otros reductores si los tienes

// Combina todos los reductores en un solo reductor raíz
const ReducerMaster = combineReducers({
 
    columnRandomReducer,
    taskReducer,
    SendMailReducer,
});

export default ReducerMaster;
