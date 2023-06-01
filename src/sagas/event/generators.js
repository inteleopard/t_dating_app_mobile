import {call} from 'redux-saga/effects';
import {getEvent, getEvents} from '../../services/eventService';
import {sagaResolver} from '../../utils/helpers';

export function* getEventsSaga({query, resolver}) {
  console.log('getEventsSaga');
  const res = yield call(getEvents, query);
  sagaResolver(resolver, res);
}

export function* getEventSaga({eventId, resolver}) {
  console.log('getEventSaga');
  const res = yield call(getEvent, eventId);
  sagaResolver(resolver, res);
}
