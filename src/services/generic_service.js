import auth from '@react-native-firebase/auth';
import axios from './axios_config';
import api_config from './api_config';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Todo este modulo se usa solo cuando el usuario ya esta logueado con Firebase */

export const getToken = async (forceJWT) => {
  let token;
  let account;
  let isLocalToken = false;

  try {
    const _token = await AsyncStorage.getItem('local_token');
    account = await AsyncStorage.getItem('account');
    if (forceJWT || _token === null) {
      token = await auth().currentUser.getIdToken(true);
      console.log('using firebase token');
      token = `${token}@${account}`;
    } else {
      token = _token;
      isLocalToken = true;
      console.log('using local_token');
    }
  } catch (e) {}

  return `${isLocalToken ? 'LJWT' : 'JWT'} ${token}`;
};

const getConfig = async (forceJWT) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Authorization': await getToken(forceJWT),
    },
  };
};

const genericMethodWithData = (method) => async (url, data, forceJWT) => {
  const config = await getConfig(forceJWT);
  console.log(method, api_config.baseURL, url, data, config);
  let res;
  try {
    res = await axios[method.toLowerCase()](url, data, config);
  } catch (e) {
    console.log(`Error ${method} ${url}: ${e}`);
  }
  return res;
};

const genericMethodNoData = (method) => async (url, forceJWT) => {
  const config = await getConfig(forceJWT);
  console.log(method, api_config.baseURL, url, config);
  let res;
  try {
    res = await axios[method.toLowerCase()](url, config);
  } catch (e) {
    console.log(`Error ${method} ${url}: ${e}`);
  }
  return res;
};

export default {
  doGet: genericMethodNoData('GET'),
  doPost: genericMethodWithData('POST'),
  doPut: genericMethodWithData('PUT'),
  doDelete: genericMethodNoData('DELETE'),
};
