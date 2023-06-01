import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

import configureStore from './CreateStore';
import rootSaga from '../sagas';

import {authReducer} from './auth/Reducers';
import {profileReducer} from './profile/Reducers';
import {startupReducer} from './startup/Reducers';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['isRefreshingAccess'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  profile: profileReducer,
  startup: startupReducer,
});

export const {store, persistor} = configureStore(rootReducer, rootSaga);

export const getStore = () =>
  new Promise(async resolve => {
    while (!store) {
      await new Promise(innerResolve => setTimeout(innerResolve, 1000));
    }

    resolve(store);
  });

export default store;
