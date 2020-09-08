import axios from 'react-native-axios';
import api_config from './api_config';

export default axios.create({
  https: api_config.https,
  baseURL: api_config.baseURL,

  // Configuraciones generales
  crossdomain: true,
  mode: 'no-cors',
  withCredentials: true,
  credentials: 'same-origin',
});
