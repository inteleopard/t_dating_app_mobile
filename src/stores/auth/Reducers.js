import {createReducer} from 'reduxsauce';
import {AuthTypes} from 'src/stores/auth/Actions';

const INITIAL_STATE = {
  access: null,
  refresh: null,
  isRefreshingAccess: false,
  isLogged: false,
};

export const storeToken = (state, {access, refresh}) => ({
  ...state,
  access,
  refresh,
  isLogged: true,
});

export const setRefreshingToken = (state, {status}) => ({
  ...state,
  isRefreshingAccess: status,
});

export const authReducer = createReducer(INITIAL_STATE, {
  [AuthTypes.STORE_TOKEN]: storeToken,
  [AuthTypes.SET_REFRESHING_TOKEN]: setRefreshingToken,
  [AuthTypes.RESET_REDUCER]: () => INITIAL_STATE,
});
