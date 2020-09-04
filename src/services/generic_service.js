import auth from '@react-native-firebase/auth';
import api from './api';

/* Todo este modulo se usa solo cuando el usuario ya esta logueado con Firebase */

const getConfig = async (isFile, data) => {
  const token = await auth().currentUser.getIdToken(true);
  console.log("Data", data);
  if (isFile) {
    return {
      headers: {
        'Content-Type': 'multipart/mixed', 
        'Authorization': `JWT ${token}`,
      },
    };
  } else {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        'Authorization': `JWT ${token}`,
      },
    };
  }
};

export default {
  doGet: async (url, isFile = false) => {
    const config = await getConfig(isFile);
    console.log('GET', url, config);
    return api.get(url, config);
  },
  doPost: async (url, data, isFile = false) => {
    const config = await getConfig(isFile, data);
    console.log('POST', url, data, config);
    return api.post(url, data, config);
  },
  doPut: async (url, data, isFile = false) => {
    const config = await getConfig(isFile);
    console.log('PUT', url, data, config);
    return api.put(url, data, config);
  },
  doDelete: async (url, isFile = false) => {
    const config = await getConfig(isFile);
    console.log('DELETE', url, config);
    return api.delete(url, config);
  },
}