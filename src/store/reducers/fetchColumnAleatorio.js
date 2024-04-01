import * as types from '../actions/actionTypes'; // Importa los tipos de acciones desde actionTypes.js

const initState = {
    dataRandom: null,
    error: false,
    loading: false,
    palabraEspañol: null,
}

const columnRandomReducer = (state = initState, action) => {
    switch(action.type){
        case types.FETCH_COLUMN_RANDOM_START: // Accede a los tipos de acciones a través del objeto types
            return {...state, loading:true };
        case types.FETCH_COLUMN_RANDOM_SUCCESS:
            return { ...state, loading: false, error: false, dataRandom: action.payload }; 
        case types.FETCH_COLUMN_RANDOM_FAILED:
            return {...state, loading:false, error: true};

            case types.FETCH_TRADUCCION_START: 
            return {...state, loading:true };
        case types.FETCH_TRADUCCION_SUCCESS:
            return { ...state, loading: false, error: false, palabraEspañol: action.payload }; 
        case types.FETCH_TRADUCCION_FAILED:
            return {...state, loading:false, error: true};
        default: return state;

    }
};

export default columnRandomReducer;
