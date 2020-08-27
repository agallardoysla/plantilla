import axios from 'react-native-axios';

export default axios.create({
  // Produccion
  // https: true,
  // baseURL: 'http://45.33.112.154:8000/api/',

  // Desarrollo
  https: false,
  baseURL: 'http://192.168.0.37:8000/api/',
});
