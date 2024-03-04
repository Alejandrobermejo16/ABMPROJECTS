import * as types from '../actions/actionTypes'; // Importa los tipos de acciones desde actionTypes.js

const initState = {
    dataRandom: null,
    error: false,
    loading: false,
}

const columnRandomReducer = (state = initState, action) => {
    switch(action.type){
        case types.FETCH_COLUMN_RANDOM_START: // Accede a los tipos de acciones a través del objeto types
            console.log("estoy en el start");
            return {...state, loading:true };
        case types.FETCH_COLUMN_RANDOM_SUCCESS:
            console.log("estoy en el success");
            return { ...state, loading: false, error: false, dataRandom: action.payload }; 
        case types.FETCH_COLUMN_RANDOM_FAILED:
            console.log("estoy en el failed");
            return {...state, loading:false, error: true};
        default: return state;
    }
};

export default columnRandomReducer;
