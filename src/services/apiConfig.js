import axios from 'axios';
import {API_URL} from '../config';
import {getStore} from 'src/stores';
import AuthActions from 'src/stores/auth/Actions';
import navigationService from './navigationService';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  if (error.message === 'Network Error') {
    navigationService.navigateAndReset('NoInternetScreen');
  }

  const originalRequest = error.config;
  if ((error?.response?.status === 401) && (error?.response?.data.message === 'token_invalid') && !originalRequest._retry) {
    const {access} = await refreshTokenPromise();
    originalRequest.headers.Authorization = 'Bearer ' + access?.token;
    originalRequest._retry = true;
    return api(originalRequest);
  }

  return Promise.reject(error);
});

export const getAccess = () => new Promise(async resolve => {
  const store = await getStore();
  if (store) {
    resolve(store.getState().auth?.access);
  }
});

export const getRefresh = () => new Promise(async resolve => {
  const store = await getStore();
  if (store) {
    resolve(store.getState().auth?.refresh);
  }
});

const refreshTokenPromise = () => new Promise(async (resolve, reject) => {
  const store = await getStore();
  store.dispatch(AuthActions.refreshToken({resolve, reject}));
});

export const secureGet = async (url, config = {}, params = {}) => {
  const access = await getAccess();
  const {headers, ...restConfig} = config;
  const conf = {
    headers: {
      ...headers,
      Authorization: `Bearer ${access?.token}`,
    },
    ...restConfig,
    params,
  };
  return api.get(url, conf);
};

export const secureDelete = async (url) => {
  const access = await getAccess();
  return api.delete(url, {headers: {Authorization: `Bearer ${access?.token}`}});
};

export const securePost = async (url, data, params = {}, config = {}) => {
  const access = await getAccess();
  const {headers, ...restConfig} = config;
  const conf = {
    headers: {
      ...headers,
      Authorization: `Bearer ${access?.token}`,
    },
    ...restConfig,
    params,
  };
  return api.post(url, data, conf);
};

export const securePatch = async (url, data, params = {}, config = {}) => {
  const access = await getAccess();
  const {headers, ...restConfig} = config;
  const conf = {
    headers: {
      ...headers,
      Authorization: `Bearer ${access?.token}`,
    },
    ...restConfig,
    params,
  };
  return api.patch(url, data, conf);
};

export const securePut = async (url, data, params = {}, config = {}) => {
  const access = await getAccess();
  const {headers, ...restConfig} = config;
  const conf = {
    headers: {
      ...headers,
      Authorization: `Bearer ${access?.token}`,
    },
    ...restConfig,
    params,
  };
  return api.put(url, data, conf);
};

export default api;
