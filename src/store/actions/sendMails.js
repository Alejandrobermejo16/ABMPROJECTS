import * as types from './actionTypes';


export const sendHorseMailStart = (destinatario, asunto, mensaje, nombreReserva) => ({
    type: types.SEND_EMAIL_HORSE_SCREEN_RESERVATION_START,
    payload: {destinatario, asunto, mensaje, nombreReserva},
});

export const sendHorseMailSuccess = () => ({
    type: types.SEND_EMAIL_HORSE_SCREEN_RESERVATION_SUCESSS,
    payload: {},
});

export const sendHorseMailFailed = () => ({
    type: types.SEND_EMAIL_HORSE_SCREEN_RESERVATION_FAILED,
    payload: {},
});