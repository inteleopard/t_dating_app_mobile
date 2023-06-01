import { call, fork, put, race, select, take } from 'redux-saga/effects';

import { getStore, persistor } from '../../stores';
import AuthActions, { AuthTypes } from '../../stores/auth/Actions';
import StartupActions from '../../stores/startup/Actions';
import navigationService from '../../services/navigationService';
import { login, refreshAccess, signUp } from '../../services/authService';

export function* loginUser({ email, password, resolver }) {
  const userRes = yield call(() => login({ email, password }).catch(error => {
    console.log('loginUserError', error?.response?.data.message);
    if (typeof resolver?.reject === 'function') {
      resolver?.reject(error?.response?.data.message);
    }
  }));

  if (userRes?.data) {
    const { tokens: { access, refresh } } = userRes?.data;

    yield call(saveAndCheckTokenSaga, { access, refresh });
    yield put(StartupActions.startup());
    if (typeof resolver?.resolve === 'function') {
      resolver?.resolve();
    }
  } else {
    if (typeof resolver?.reject === 'function') {
      resolver?.reject('There was an error while login');
    }
  }
}

export function* logout() {
  console.log('logout');
  const currentRouteName = yield call(() => navigationService.getCurrentRouteName());

  if (currentRouteName === 'Login') {
    console.log('already logged out');
    return;
  }

  try {
    yield call(() => navigationService.navigateAndReset('Login'));
    yield fork(() => persistor.purge());
    yield put(AuthActions.resetReducer());
  } catch (e) {
    console.log('logout error: ', e);
  }
}

export function* signUpUser({ body, resolver }) {
  let errorMsg;
  const res = yield call(() => {
    return signUp(body).catch(error => {
      console.log('signUpUserError', error);
      errorMsg = error?.response?.data?.message;
    });
  });

  if (errorMsg) {
    yield resolver.reject(errorMsg);
  }

  if (res?.status === 201) {
    yield resolver.resolve();
    yield put(AuthActions.userLogin(body.email, body.password));
  } else {
    yield resolver.reject('There was an error while signUp');
  }
}

/**
 * to ensure token is saved, before going next
 * */
export function* saveAndCheckTokenSaga({ access, refresh, resolver }) {
  yield put(AuthActions.storeToken(access, refresh));

  while (1) {
    console.log('saveAndCheckTokenSaga - loop');
    const savedAccess = yield select(state => state.auth.access.token);
    if (savedAccess === access.token) {
      if (typeof resolver?.resolve === 'function') {
        resolver.resolve(access);
      }
      return access;
    }
  }
}

//todo jsdoc
export function* refreshToken({ resolver }) {
  const { access: oldAccess, isRefreshingAccess } = yield select(state => state.auth);

  /**
   * to make sure we break the loop if it gets stuck somehow
   * */
  const timeout = setTimeout(async function() {
    const store = await getStore();
    console.log('refreshToken - timeout callback! - id: ' + timeout);
    store.dispatch(AuthActions.recallRefresh());
  }, 4000);

  if (isRefreshingAccess) {
    console.log('refreshToken - already refreshing...');
    while (1) {
      console.log('refreshToken - waiting...');
      const { statusPayload, recallPayload } = yield race({
        statusPayload: take(AuthTypes.SET_REFRESHING_TOKEN),
        recallPayload: take(AuthTypes.RECALL_REFRESH),
      });

      clearTimeout(timeout);

      if (statusPayload?.status === false) {
        const { access, refresh } = yield select(state => state.auth);

        if (oldAccess && access && oldAccess.token !== access.token) {
          console.log('refreshToken - resolved!');
          if (typeof resolver?.resolve === 'function') {
            resolver.resolve({ access, refresh });
          }
          return access;
        } else {
          if (typeof resolver?.resolve === 'function') {
            return resolver.reject('refreshToken - race refresh fail!');
          }
        }
      }

      if (recallPayload) {
        console.log('refreshToken - failed: to call again!');
        return yield call(refreshToken, { resolver });
      }
    }
  } else {
    console.log('refreshToken - getting new access!');
    yield put(AuthActions.setRefreshingToken(true));
    const { refresh: savedRefresh } = yield select(state => state.auth);
    const tokenRes = yield call(refreshAccess, savedRefresh?.token);
    clearTimeout(timeout);

    if (tokenRes?.data) {
      const { access, refresh } = tokenRes.data;
      yield call(saveAndCheckTokenSaga, { access, refresh });
      yield put(AuthActions.setRefreshingToken(false));

      console.log('refreshToken - refresh complete!');
      if (typeof resolver?.resolve === 'function') {
        return resolver.resolve({ access, refresh });
      }
    } else {
      yield put(AuthActions.setRefreshingToken(false));
      yield put(AuthActions.logout());

      if (typeof resolver?.resolve === 'function') {
        return resolver.reject('refreshToken - could not refresh token!');
      }
    }
  }
}
