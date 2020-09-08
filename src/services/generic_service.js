import auth from '@react-native-firebase/auth';
import axios from './axios_config';
import api_config from './api_config';

/* Todo este modulo se usa solo cuando el usuario ya esta logueado con Firebase */

const getConfig = async () => {
  const token = await auth().currentUser.getIdToken(true);
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Authorization': `JWT ${token}`,
    },
  };
};

export default {
  doGet: async (url) => {
    const config = await getConfig();
    console.log(api_config.baseURL, 'GET', url, config);
    return axios.get(url, config);
  },
  doPost: async (url, data) => {
    const config = await getConfig();
    console.log('POST', url, data, config);
    return axios.post(url, data, config);
  },
  doPut: async (url, data) => {
    const config = await getConfig();
    console.log('PUT', url, data, config);
    return axios.put(url, data, config);
  },
  doDelete: async (url) => {
    const config = await getConfig();
    console.log('DELETE', url, config);
    return axios.delete(url, config);
  },
}