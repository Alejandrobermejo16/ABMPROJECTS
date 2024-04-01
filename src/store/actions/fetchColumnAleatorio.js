// fetchColumnAleatorio.js en la carpeta actions
import * as types from './actionTypes';

export const fetchColumnRandomStart = () => ({
    type: types.FETCH_COLUMN_RANDOM_START,
    payload: {},
});

export const fetchColumnRandomSuccess = (dataRandom) => ({
    type: types.FETCH_COLUMN_RANDOM_SUCCESS,
    payload: {dataRandom},
});

export const fetchColumnRandomFailed = (error) => ({
    type: types.FETCH_COLUMN_RANDOM_FAILED,
    payload: {error},
});


export const fetchTraduccionStart = (palabraIngles) => ({
    type: types.FETCH_TRADUCCION_START,
    payload: {palabraIngles},
});

export const fetchTraduccionSuccess = (palabraEspañol) => ({
    type: types.FETCH_TRADUCCION_SUCCESS,
    payload: {palabraEspañol},
});

export const fetchTraduccionFailed = (error) => ({
    type: types.FETCH_TRADUCCION_FAILED,
    payload: {error},
});