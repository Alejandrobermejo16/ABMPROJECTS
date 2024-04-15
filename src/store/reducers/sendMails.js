import * as types from '../actions/actionTypes';


const initState = {

}

const SendMailReducer = (state = initState, action) => {
    switch(action.type){
        case types.SEND_EMAIL_HORSE_SCREEN_RESERVATION_START: 
            return {...state };
            case types.SEND_EMAIL_HORSE_SCREEN_RESERVATION_SUCESSS:
                return {}

            case types.SEND_EMAIL_HORSE_SCREEN_RESERVATION_FAILED:
                return {} 

        default: return state;

    }
};

export default SendMailReducer;
