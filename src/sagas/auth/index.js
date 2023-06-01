import {takeEvery, takeLatest} from 'redux-saga/effects';
import {AuthTypes} from '../../stores/auth/Actions';
import {
  loginUser,
  logout,
  refreshToken,
  saveAndCheckTokenSaga,
  signUpUser,
} from './generators';

export default [
  takeLatest(AuthTypes.USER_LOGIN, loginUser),
  takeLatest(AuthTypes.LOGOUT, logout),
  takeLatest(AuthTypes.USER_SIGN_UP, signUpUser),
  takeLatest(AuthTypes.SAVE_AND_CHECK_TOKEN, saveAndCheckTokenSaga),
  takeEvery(AuthTypes.REFRESH_TOKEN, refreshToken),
];
