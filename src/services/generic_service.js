import auth from '@react-native-firebase/auth';
import {axios_v1} from './axios_config';
import api_config from './api_config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cache from '../utils/Cache';

/* Todo este modulo se usa solo cuando el usuario ya esta logueado con Firebase */

export const getToken = async () => {
  const   token = await auth().currentUser.getIdToken(true);
  return `JWT ${token}`;
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

const getConfigFile = async (forceJWT) => {
  return {
    headers: {
      'Content-Type': 'multipart/mixed',
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
    res = await axios_v1[method.toLowerCase()](url, data, config);
  } catch (e) {
    console.log(`Error ${method} ${url}: ${e.message}`);
    return e;
  }
  return res;
};

const genericMethodWithFile = (method) => async (url, data, forceJWT) => {
  const config = await getConfigFile(forceJWT);
  //console.log(method, api_config.baseURL, url, data, config);
  let res;
  try {
    res = await axios_v1[method.toLowerCase()](url, data, config);
  } catch (e) {
    //console.log(`Error ${method} ${url}: ${e}`);
  }
  return res;
};

const genericMethodNoData = (method) => async (url, forceJWT) => {
  const config = await getConfig(forceJWT);
  console.log(method, api_config.baseURL, url, config);
  let res;
  try {
    res = await axios_v1[method.toLowerCase()](url, config);
  } catch (e) {
    console.log(`Error ${method} ${url}: ${e.message}`);
    return e;
  }
  return res;
};

export default {
  doGet: genericMethodNoData('GET'),
  doPost: genericMethodWithData('POST'),
  doPostFile: genericMethodWithFile('POST'),
  doPut: genericMethodWithData('PUT'),
  doDelete: genericMethodNoData('DELETE'),
};
