import auth from '@react-native-firebase/auth';
import api from './api';

/* Todo este modulo se usa solo cuando el usuario ya esta logueado con Firebase */

const getConfig = async () => {
  const token = await auth().currentUser.getIdToken(true);
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `JWT ${token}`,
    },
  };
};

export default {
  doGet: async (url) => {
    const config = await getConfig();
    console.log(url, config);
    return api.get(url, config);
  },
  doPost: async (url, data) => {
    const config = await getConfig();
    return api.post(url, config);
  },
  doPut: async (url, data) => {
    const config = await getConfig();
    return api.put(url, config);
  },
  doDelete: async (url, data) => {
    const config = await getConfig();
    return api.delete(url, config);
  },
}