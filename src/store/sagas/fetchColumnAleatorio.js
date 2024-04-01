import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchColumnRandomSuccess, fetchColumnRandomFailed, fetchTraduccionSuccess, fetchTraduccionFailed } from '../actions/fetchColumnAleatorio';
import * as types from '../actions/actionTypes';


function* getRandomWord(action) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '83865577b2msh00d10cbdee599c3p160c73jsn49e3f4ef40d0',
                'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
            }
        };

        const response = yield call(fetch, 'https://random-words5.p.rapidapi.com/getRandom', options);

        const dataRandom = yield response.text(); // Obtener el texto sin procesar de la respuesta
        yield put(fetchColumnRandomSuccess(dataRandom)); // Despachar la acción con los datos sin procesar
    } catch (error) {
        yield put(fetchColumnRandomFailed(error));
    }
}

function* getSpainWord(action) {
    const { palabraIngles } = action.payload;

    const url = 'https://rapid-translate-multi-traduction.p.rapidapi.com/t';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '83865577b2msh00d10cbdee599c3p160c73jsn49e3f4ef40d0',
            'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
        },
        body: JSON.stringify({
            from: 'en',
            to: 'ar',
            q: palabraIngles
        })
    };

    try {
        const response = yield call(fetch, url, options);
        const palabraEspañol = yield response.json();
        yield put(fetchTraduccionSuccess(palabraEspañol));
    } catch (error) {
        yield put(fetchTraduccionFailed(error));
    }
}


function* wordsagas() {
    yield takeLatest(types.FETCH_COLUMN_RANDOM_START, getRandomWord);
    yield takeLatest(types.FETCH_TRADUCCION_START, getSpainWord);


}

export default wordsagas;
