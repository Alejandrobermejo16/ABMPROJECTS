// rootSaga.js

import { all } from 'redux-saga/effects';
import wordsagas from './fetchColumnAleatorio';

export default function* SagaMaster() {
    yield all([
        wordsagas(), // Debes llamar a la función generadora
    ]);
}
