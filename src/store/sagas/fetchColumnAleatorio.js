import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchColumnRandomSuccess, fetchColumnRandomFailed, actions } from '../actions/fetchColumnAleatorio'; // Asegúrate de importar actions también

function* randomSaga(action) { // Cambia actions por action
    try {
        console.log("estoy en el sagas");
        const response = yield call(fetch, 'https://clientes.api.greenborn.com.ar/public-random-word');
        const dataRandom = yield response.json();
        yield put(fetchColumnRandomSuccess(dataRandom));
    } catch (error) {
        yield put(fetchColumnRandomFailed(error));
    }
}

export default function* randomSagas() {
    yield takeLatest(actions.FETCH_COLUMN_RANDOM_START, randomSaga);
}
