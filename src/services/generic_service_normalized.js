import auth from '@react-native-firebase/auth';
import {axios_normalized} from './axios_config';
import api_config from './api_config';

/* Todo este modulo se usa solo cuando el usuario ya esta logueado con Firebase */

export const getToken = async () => {
  const token = await auth().currentUser.getIdToken(true);
  return `Bearer ${token}`;
};

const getConfig = async () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Authorization': await getToken(),
    },
  };
};

const genericMethodWithData = (method) => async (url, data) => {
  const config = await getConfig();
  //console.log(method, api_config.normalizedBaseURL, url, data, config);
  let res;
  try {
    res = await axios_normalized[method.toLowerCase()](url, data, config);
  } catch (e) {
    //console.log(`Error ${method} ${url}: ${e}`);
  }
  return res;
};

const genericMethodNoData = (method) => async (url) => {
  const config = await getConfig();
  //console.log(method, api_config.normalizedBaseURL, url, config);
  let res;
  try {
    res = await axios_normalized[method.toLowerCase()](url, config);
  } catch (e) {
    //console.log(`Error ${method} ${url}: ${e}`);
  }
  return res;
};

export default {
  doGet: genericMethodNoData('GET'),
  doPost: genericMethodWithData('POST'),
  doPut: genericMethodWithData('PUT'),
  doDelete: genericMethodNoData('DELETE'),
};
