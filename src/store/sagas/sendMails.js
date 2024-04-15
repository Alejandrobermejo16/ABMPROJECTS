import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { sendHorseMailSuccess, sendHorseMailFailed } from '../actions/sendMails';

function* sendMailHorseSagas(action) {
  const { destinatario, asunto, mensaje, nombreReserva } = action.payload;

{/*curl -X POST   -H "Content-Type: application/json"   -d '{"destinatario":"trsasm@gmail.com","asunto":"Prueba desde la terminal",
"mensaje":"Este es un mensaje de prueba desde la terminal"}'   https://backendabmprojects.vercel.app/*/}


  const url = 'https://backendabmprojects.vercel.app/'; // Reemplaza con la URL de tu servidor backend
  const data = {
    destinatario: 'alejandrobermejomendez170712@gmail.com',
    asunto: 'Prueba desde el frontend',
    mensaje: 'nada'
  };

  try {
    const response = yield call(fetch, url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const responseData = yield response.json();
    yield put(sendHorseMailSuccess(responseData)); // Manejar la acción de éxito
  } catch (error) {
    yield put(sendHorseMailFailed(error.message)); // Manejar la acción de fallo
    console.error('Error al enviar el correo:', error.message);
  }
}

function* sendMails() {
  yield takeLatest(types.SEND_EMAIL_HORSE_SCREEN_RESERVATION_START, sendMailHorseSagas);
}

export default sendMails;
