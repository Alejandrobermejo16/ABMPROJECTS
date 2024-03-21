import * as types from '../actions/actionTypes'; // Importa los tipos de acciones desde actionTypes.js

const initState = {
     listTasks: [], //lista de tareas
     error: false,
     loading: false,
     listProjects: [], //lista de proyectos

}

const taskReducer = (state = initState, action) => {
     switch (action.type) {
          case types.GET_LIST_PROJECTS_START:
               return { ...state, loading: true, };
          case types.GET_LIST_PROJECTS_SUCCESS:
               return { ...state, loading: false, error: false, listProjects: action.payload };
          case types.GET_LIST_PROJECTS_FAILED:
               return { ...state, loading: false, error: true };
          case types.ADD_TASK:
               return { ...state, loading: true, };
          case types.ADD_TASK_SUCCESS:
               return { ...state, loading: false, error: false, listProjects: action.payload };
          case types.ADD_TASK_FAILED:
               return { ...state, loading: false, error: true };
          case types.DELETE_TASK_FAILED:
               return { ...state, loading: false, error: true };
          case types.GET_TASK_LIST_START:
               return { ...state, loading: true };
          case types.GET_TASK_LIST_SUCCESS:
               return { ...state, loading: false, listTasks: action.payload };
          case types.GET_TASK_LIST_FAILED:
               return { ...state, loading: false, };
          case types.DELETE_TASK:
               return { ...state, loading: true };
          case types.DELETE_TASK_SUCCESS:
               const { idTask } = action.payload;
               //eliminamos de la lista anterior la tarea con el id que vine del sagas 
               const newListTask = state.listTasks.listTasks.filter(task => task.id !== idTask);
               return { ...state, loading: false, error: false, listTasks: { listTasks: newListTask } };
              //Para mantener la estructura de estado inmutable creamos un literal que pasará un objeto a nuestra prop con la nueva lista 

          default: return state;

     }
};

export default taskReducer;
