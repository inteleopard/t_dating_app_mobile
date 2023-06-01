import { takeLatest } from 'redux-saga/effects';

import { ProfileTypes } from 'src/stores/profile/Actions';
import { fetchProfile, updateProfile } from './generators';

export default [
  takeLatest(ProfileTypes.FETCH_PROFILE, fetchProfile),
  takeLatest(ProfileTypes.UPDATE_PROFILE, updateProfile),
];
