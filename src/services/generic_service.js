import auth from '@react-native-firebase/auth';
import api from './api';

/* Todo este modulo se usa solo cuando el usuario ya esta logueado con Firebase */

const getConfig = () => {
  const token = auth().currentUser.getIdToken(true);
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
    },
  };
};

export default {
  doGet: (url, data) => api.get(url, data, getConfig()),
  doPost: () => {},
  doPut: () => {},
  doDelete: () => {},
}