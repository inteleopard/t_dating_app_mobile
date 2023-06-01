import {secureGet} from './apiConfig';

export const getEvents = async (query) => await secureGet('/events/v1/event/', {}, query).catch(err => console.log('getEvents:', err));
export const getEvent = async (eventId) => await secureGet(`/events/v1/event/${eventId}/`).catch(err => console.log('getEvent:', err));
