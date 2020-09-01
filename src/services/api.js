import axios from 'react-native-axios';

export default axios.create({
  // Produccion
  https: true,
  baseURL: 'https://friendschallenge.webredirect.org/api/v1/',

  // Desarrollo
  // https: false,
  // baseURL: 'http://192.168.0.37:8000/api/',
});
