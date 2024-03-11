import * as types from './actionTypes';


export const getListTask = () => ({
    type: types.GET_LIST_TASK,
    payload: {},
});

export const getListTaskSuccess = (listTask) => ({
    type: types.GET_LIST_TASK_SUCCESS,
    payload: {listTask},
});

export const getListTaskFailed = (error) => ({
    type: types.GET_LIST_TASK_FAILED,
    payload: {error},
});


export const addTaskStart = (id, text) => ({
    type: types.ADD_TASK,
    payload: {id, text},
});

export const addTaskSuccess = (task, idTask) => ({
    type: types.ADD_TASK_SUCCESS,
    payload: {task, idTask},
});

export const addTaskFailed = (error) => ({
    type: types.ADD_TASK_FAILED,
    payload: {error},
});




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
