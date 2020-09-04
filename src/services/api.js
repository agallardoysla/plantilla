import axios from 'react-native-axios';

export default axios.create({
  // Produccion
  https: true,
  baseURL: 'https://friendschallenge.webredirect.org/api/v1/',

  // Desarrollo
  // https: false,
  // baseURL: 'http://192.168.0.37:8000/api/',

  // Test
  // https: false,
  // baseURL: 'http://2e4e7fb99086.ngrok.io/api/v1/',

  // Configuraciones generales
  crossdomain: true,
  mode: 'no-cors',
  withCredentials: true,
  credentials: 'same-origin',
});
