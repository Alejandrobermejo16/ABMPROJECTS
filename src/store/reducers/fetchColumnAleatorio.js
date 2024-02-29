import { actions } from '../actions/fetchColumnAleatorio';

const initState = {
    dataRandom: null,
    error: false,
    loading: false,
}

export const columnRandomReducer = (state = initState, action) => {
    switch(action.type){
        case actions.FETCH_COLUMN_RANDOM_START:
            console.log("estoy en el start");
            return {...state, loading:true};
        case actions.FETCH_COLUMN_RANDOM_SUCCESS:
            console.log("estoy en el success");
            return { ...state, loading: false, error: false, dataRandom: action.payload }; 
        case actions.FETCH_COLUMN_RANDOM_FAILED:
            console.log("estoy en el start");
            return {...state, loading:false, error: true};
        default: return state;
    }
};
