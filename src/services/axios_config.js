import axios from 'react-native-axios';
import api_config from './api_config';

export const axios_v1 = axios.create({
  https: api_config.https,
  baseURL: api_config.baseURL,

  // Configuraciones generales
  crossdomain: true,
  mode: 'no-cors',
  withCredentials: true,
  credentials: 'same-origin',
});

export const axios_normalized = axios.create({
  https: api_config.https,
  baseURL: api_config.normalizedBaseURL,

  // Configuraciones generales
  crossdomain: true,
  mode: 'no-cors',
  withCredentials: true,
  credentials: 'same-origin',
});
