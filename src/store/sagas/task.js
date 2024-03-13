//crear una llamada a una api de tareas, debe crear una tearea en una base de datos
//y lo que devolveremos del sagas es la lista filtrada con el elemento nuevo incluido

//para borrar al contrario, se hace la llamada con el id de la tarea y , lo que hace es , devolver todas las tareas menos la eliminada

import * as types from '../actions/actionTypes';

import { TodoistApi } from "@doist/todoist-api-typescript";
import { put, takeLatest } from 'redux-saga/effects';

import { getListProjectsSuccess, getListProjectsFailed, } from '../actions/task';



// Función para obtener y mostrar los proyectos
function* getProjectsSaga() {
  // Utiliza el token de autenticación de config
  const todoistToken = process.env.REACT_APP_TODOIST_TOKEN;

  const api = new TodoistApi(todoistToken);
  try {
    const projects = yield api.getProjects();
    yield put(getListProjectsSuccess(projects));
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    yield put(getListProjectsFailed(error));
  }
}


function* addTask(action) {
  const todoistToken = process.env.REACT_APP_TODOIST_TOKEN;
  const { selectedProjectId, text } = action.payload;
  const api = new TodoistApi(todoistToken);

  try {
    yield api.addTask({ content: `${text}`, projectId: `${selectedProjectId}` });
    alert('La tarea ha sido añadida correctamente');
  } catch (error) {
    alert(error);
  }
}



function* tasksagas() {
  yield takeLatest(types.GET_LIST_PROJECTS_START, getProjectsSaga);
  yield takeLatest(types.ADD_TASK, addTask)
}

export default tasksagas;
