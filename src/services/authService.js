import api from './apiConfig';

export const login = async ({email, password}) => await api.post('/v1/auth/login/', {
  email,
  password,
}).catch(Promise.reject);
export const refreshAccess = async (refreshToken) => await api.post('/v1/auth/refresh-tokens/', {refreshToken}).catch(err => console.log('refreshAccess:', err));
export const signUp = async (data) => await api.post('/v1/auth/register/', data).catch(Promise.reject);
