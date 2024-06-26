// rootSaga.js

import { all } from 'redux-saga/effects';
import wordsagas from './fetchColumnAleatorio';
import tasksagas from './task';
import sendMails from './sendMails';

export default function* SagaMaster() {
    yield all([
        wordsagas(), // Debes llamar a la función generadora
        tasksagas(),
        sendMails(),
    ]);
}
