import {call, cancelled, put, race, select, take} from 'redux-saga/effects';

import {fetchProfile} from '../profile/generators';
import NavigationService from 'src/services/navigationService';
import StartupActions from 'src/stores/startup/Actions';
import {AuthTypes} from '../../stores/auth/Actions';

export function* startupSaga() {
  yield race([
    call(startup),
    take(AuthTypes.LOGOUT),
  ]);
}

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  try {
    yield put(StartupActions.setLoading(true));

    const profileData = yield call(fetchProfile, {});

    const isLogged = yield select(state => state.auth?.isLogged);
    if (!isLogged) {
      NavigationService.navigateAndReset('Login');
    } else if (!profileData) {
      NavigationService.navigateAndReset('ErrorScreen');
    } else {
      NavigationService.navigateAndReset('Home');
    }

    yield put(StartupActions.setLoading(false));
  } finally {
    if (yield cancelled()) {
      yield put(StartupActions.setLoading(false));
    }
  }
}
