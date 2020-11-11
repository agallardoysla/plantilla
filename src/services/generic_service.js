import auth from '@react-native-firebase/auth';
import axios from './axios_config';
import api_config from './api_config';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Todo este modulo se usa solo cuando el usuario ya esta logueado con Firebase */

const getConfig = async () => {
  let token;
  let isLocalToken = false;
  try {
    const _token = await AsyncStorage.getItem('local_token');
    if (_token !== null) {
      token = _token;
      isLocalToken = true;
      console.log('using local_token');
    } else {
      token = await auth().currentUser.getIdToken(true);
      console.log('using firebase token');
    }
  } catch (e) {}
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Authorization': `${isLocalToken ? 'LJWT' : 'JWT'} ${token}`,
    },
  };
};

export default {
  doGet: async (url) => {
    const config = await getConfig();
    console.log(api_config.baseURL, 'GET', url, config);
    let res;
    try {
      res = await axios.get(url, config);
    } catch (e) {
      console.log(`Error GET ${url}: ${e}`);
    }
    return res;
  },
  doPost: async (url, data) => {
    const config = await getConfig();
    console.log('POST', url, data, config);
    let res;
    try {
      res = await axios.post(url, data, config);
    } catch (e) {
      console.log(`Error POST ${url}: ${e}`);
    }
    return res;
  },
  doPut: async (url, data) => {
    const config = await getConfig();
    console.log('PUT', url, data, config);
    let res;
    try {
      res = await axios.put(url, data, config);
    } catch (e) {
      console.log(`Error PUT ${url}: ${e}`);
    }
    return res;
  },
  doDelete: async (url) => {
    const config = await getConfig();
    console.log('DELETE', url, config);
    let res;
    try {
      res = await axios.delete(url, config);
    } catch (e) {
      console.log(`Error DELETE ${url}: ${e}`);
    }
    return res;
  },
}