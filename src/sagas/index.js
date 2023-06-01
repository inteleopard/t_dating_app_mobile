import { all } from 'redux-saga/effects';

import authSagas from './auth';
import profileSaga from './profile';
import startupSaga from './startup';
import eventSaga from './event';

export default function* rootSaga() {
  yield all([].concat(
    authSagas,
    profileSaga,
    startupSaga,
    eventSaga
  ));
}
