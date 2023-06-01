import api, {secureDelete, secureGet, securePatch, securePost, securePut} from './apiConfig';

export const fetchUsersList = async params => await secureGet('/v1/users/', {}, params).catch(err => console.log('fetchUsersList:', err));
export const fetchUser = async userId => await secureGet(`/v1/users/${userId}`).catch(err => console.log('fetchUser:', err));
export const me = async () => await secureGet('/v1/users/me/').catch(err => console.log('me:', err));
export const patchProfile = async (data) => await securePatch('/v1/users/me/', data).catch(err => console.log('patchProfile:', err));
export const saveFcmToken = async (token) => await securePost('/v1/users/me/fcm-tokens/', {token}).catch(err => console.log('saveFcmToken service:', err));
export const uploadImage = async (formData) => await securePost('/v1/users/me/images/', formData, {}, {
  headers: {'Content-type': 'multipart/form-data'},
  transformRequest: (data) => data,
}).catch(err => console.log('uploadImage:', err));
export const removeImage = async (id) => await secureDelete(`/v1/users/me/images/${id}/`).catch(Promise.reject);
export const setAvatar = async (id) => await securePut(`/v1/users/me/images/set-avatar/${id}/`).catch(err => console.log('setAvatar:', err));
export const getLinks = async (id) => await secureGet(`/v1/users/me/links/${id}/`).catch(err => console.log('getLinks:', err));
export const reportUser = async (reportData) => await securePost('/v1/users/report-user/', reportData).catch(err => console.log('reportUser:', err));
export const deleteMe = async () => await secureDelete('/v1/users/me/').catch(err => console.log('deleteMe:', err));
export const getTopImages = async () => await api.get('/v1/users/top-images/').catch(err => console.log('getTopImages:', err));
export const getIpLocation = async () => await secureGet('/v1/users/ip-location').catch(err => console.log('getIpLocation:', err));
export const phoneGetCode = async (phone) => await securePost('/v1/users/phone/get-code', {phone}).catch(err => console.log('phoneGetCode:', err));
export const phoneVerifyCode = async (phone, code) => await securePost('/v1/users/phone/verify-code', {phone, code}).catch(err => console.log('phoneVerifyCode:', err));
