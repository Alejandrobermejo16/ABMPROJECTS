import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { sendHorseMailSuccess, sendHorseMailFailed } from '../actions/sendMails';

function* sendMailHorseSagas(action) {
  const { destinatario, asunto, mensaje, nombreReserva } = action.payload;

  const url = 'https://backendabmprojects.vercel.app/';
  const data = {
    destinatario: destinatario,
    asunto: asunto,
    mensaje: mensaje
  };

  try {
    const response = yield call(fetch, url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const responseData = yield response.json();
    yield put(sendHorseMailSuccess(responseData));
  } catch (error) {
    yield put(sendHorseMailFailed(error.message));
    console.error('Error al enviar el correo:', error.message);
  }
}

function* sendMails() {
  yield takeLatest(types.SEND_EMAIL_HORSE_SCREEN_RESERVATION_START, sendMailHorseSagas);
}

export default sendMails;
