import {takeLatest} from 'redux-saga/effects';

import {EventTypes} from '../../stores/event/Actions';
import {exitEventSaga, getEventSaga, getEventsSaga, joinEventSaga} from './generators';

export default [
  takeLatest(EventTypes.GET_EVENTS, getEventsSaga),
  takeLatest(EventTypes.GET_EVENT, getEventSaga),
  takeLatest(EventTypes.JOIN_EVENT, joinEventSaga),
  takeLatest(EventTypes.EXIT_EVENT, exitEventSaga),
];
