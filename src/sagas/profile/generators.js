import {call, cancelled, put, fork} from 'redux-saga/effects';
import ProfileActions from 'src/stores/profile/Actions';
import { me, patchProfile } from '../../services/userService';

export function* fetchProfile({resolver}) {
  try {
    console.log('fetchProfile');
    yield put(ProfileActions.profileLoadingStart());
    const res = yield call(me);
    let data = res?.data;

    if (data) {
      yield put(ProfileActions.fetchProfileSuccess(data));
      yield put(ProfileActions.profileLoadingEnd());

      if (typeof resolver?.resolve === 'function') {
        resolver?.resolve(data);
      }
      return data;
    } else {
      yield put(ProfileActions.fetchProfileFailure(
        'There was an error while fetching profile information.'
      ));
      yield put(ProfileActions.profileLoadingEnd());
      if (typeof resolver?.reject === 'function') {
        resolver?.reject();
      }
    }
  } finally {
    if (yield cancelled()) {
      yield put(ProfileActions.profileLoadingEnd());
    }
  }
}

export function* refreshProfileData({resolver}) {
  try {
    console.log('refreshProfileData');
    yield put(ProfileActions.profileLoadingStart());
    const res = yield call(me);
    let data = res?.data;

    if (data) {
      yield put(ProfileActions.fetchProfileSuccess(data));
      yield put(ProfileActions.profileLoadingEnd());
      if (typeof resolver?.resolve === 'function') {
        resolver?.resolve(data);
      }
      return data;
    } else {
      yield put(ProfileActions.fetchProfileFailure('There was an error refreshing profile.'));
      yield put(ProfileActions.profileLoadingEnd());
      if (typeof resolver?.reject === 'function') {
        resolver?.reject();
      }
    }
  } finally {
    if (yield cancelled()) {
      yield put(ProfileActions.profileLoadingEnd());
    }
  }
}

export function* updateProfile({profile, resolver}, shouldFetchUsersList = true) {
  try {
    console.log('updateProfile');
    yield put(ProfileActions.profileLoadingStart());
    const res = yield call(() => patchProfile(profile));

    if (res?.status === 200) {
      yield put(ProfileActions.fetchProfileSuccess());
      yield fork(refreshProfileData, {});

      if (typeof resolver?.resolve === 'function') {
        resolver.resolve();
      }
    } else {
      yield put(
        ProfileActions.fetchProfileFailure('There was an error while saving profile.'),
      );
      if (typeof resolver?.reject === 'function') {
        resolver.reject();
      }
    }

    yield put(ProfileActions.profileLoadingEnd());
  } finally {
    if (yield cancelled()) {
      yield put(ProfileActions.profileLoadingEnd());
    }
  }
}
