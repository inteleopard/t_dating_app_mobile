import {Platform} from 'react-native';

// const localBaseUrl = Platform.OS === 'android' ? '10.0.2.2' : '192.168.0.199';
const localBaseUrl = '192.168.0.199';

export const API_URL = `http://${localBaseUrl}:3000`;
