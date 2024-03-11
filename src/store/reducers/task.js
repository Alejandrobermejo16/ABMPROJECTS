import * as types from '../actions/actionTypes'; // Importa los tipos de acciones desde actionTypes.js

const initState = {
    task: '',
    idTask: '',
    error: false,
    loading: false,
    listTask: [], //lista de proyectos
    
}

const taskReducer = (state = initState, action) => {
    switch(action.type){
        case types.GET_LIST_TASK: 
             return {...state, loading:true, };
        case types.GET_LIST_TASK_SUCCESS:
             return {...state, loading:false, error: false, listTask: action.payload};
            case types.GET_LIST_TASK_FAILED:
            return {...state, loading:false, error: true};
        case types.ADD_TASK: 
             return {...state, loading:true, };
        case types.ADD_TASK_SUCCESS:
             return {...state, loading:false, error: false, listTask: action.payload};
            case types.ADD_TASK_FAILED:
            return {...state, loading:false, error: true};
        case types.DELETE_TASK: 
             return {...state, loading:true };
        case types.DELETE_TASK_SUCCESS:
             return { ...state, loading: false, error: false, listTask: action.payload }; 
        case types.DELETE_TASK_FAILED:
            return { ...state, loading: false, error: true }; 
            default: return state;

    }
};

export default taskReducer;
