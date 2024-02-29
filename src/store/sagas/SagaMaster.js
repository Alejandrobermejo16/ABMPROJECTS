import {all} from 'redux-saga/effects';
import randomSagas from './fetchColumnAleatorio';

export default function* SagaMaster(){
    yield all([
    randomSagas,

]);
}