import {takeLatest} from 'redux-saga/effects';

import {StartupTypes} from 'src/stores/startup/Actions';
import {startupSaga} from './generators';

export default [
  takeLatest(StartupTypes.STARTUP, startupSaga),
];
