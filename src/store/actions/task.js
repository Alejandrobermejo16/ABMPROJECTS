import * as types from './actionTypes';

//te da los datos de los proyectos
export const getProjectsStart = () => ({
    type: types.GET_LIST_PROJECTS_START,
    payload: {},
});

export const getListProjectsSuccess = (listProjects) => ({
    type: types.GET_LIST_PROJECTS_SUCCESS,
    payload: {listProjects},
});

export const getListProjectsFailed = (error) => ({
    type: types.GET_LIST_PROJECTS_FAILED,
    payload: {error},
});

//añade tareas con el texto de la tarea y el id del proyecto al que corresponde
export const addTaskStart = (selectedProjectId, text) => ({
    type: types.ADD_TASK,
    payload: {selectedProjectId, text},
});

export const addTaskSuccess = (task, idTask) => ({
    type: types.ADD_TASK_SUCCESS,
    payload: {task, idTask},
});

export const addTaskFailed = (error) => ({
    type: types.ADD_TASK_FAILED,
    payload: {error},
});


export const getListTaskStart = () => ({
    type: types.GET_TASK_LIST_START,
    payload: {}
})
export const getListTaskSuccess = (listTasks) => ({
    type: types.GET_TASK_LIST_SUCCESS,
    payload: {listTasks}
})
export const getListTaskFailed = (error) => ({
    type: types.GET_TASK_LIST_FAILED,
    payload: {error}
})



//elimina las tareas 
export const deleteTask = (idTask) => ({
    type: types.DELETE_TASK,
    payload: {idTask},
});
export const deleteTaskSuccess = (task, idTask) => ({
    type: types.DELETE_TASK_SUCCESS,
    payload: {task, idTask},
});

export const deleteTaskFailed = (error) => ({
    type: types.DELETE_TASK_FAILED,
    payload: {error},
});
