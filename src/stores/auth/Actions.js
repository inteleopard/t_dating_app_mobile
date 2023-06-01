import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  userLogin: ['email', 'password', 'resolver'],
  userSignUp: ['body', 'resolver'],
  logout: null,
  saveAndCheckToken: ['access', 'refresh', 'resolver'],
  refreshToken: ['resolver'],
  storeToken: ['access', 'refresh'],
  setRefreshingToken: ['status'],
  recallRefresh: null,
  resetReducer: null,
});

export const AuthTypes = Types;
export default Creators;
