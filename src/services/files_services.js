import generic_service, { getToken } from './generic_service';
import auth from '@react-native-firebase/auth';
import RNFetchBlob from 'rn-fetch-blob';
import api_config from './api_config';
import {Platform} from 'react-native';

const url = 'files/';

const getConfig = async () => {
  return {
    // 'Content-Type': 'multipart/form-data',
    'Content-Type': 'multipart/mixed',
    Authorization: await getToken(),
  };
};

export const createPost = async (file, ext) => {
  const realPath = Platform.OS === 'ios' ? file.replace('file://', '') : file;
  return RNFetchBlob.fetch(
    'POST',
    `${api_config.baseURL}${url}`,
    {
      'Content-Type': 'multipart/form-data',
      Authorization: await getToken(),
    },
    [{name: 'file', filename: `file.${ext}`, data: RNFetchBlob.wrap(realPath)}],
  ).catch((err) => {
    console.log('ERRROOOOOOOOOR!!!!!', err);
    return {error: err};
  });
};

export default {
  list: () => generic_service.doGet(url, true),
  get: (id) => generic_service.doGet(`${url}${id}/`, true),
  create: async (fileUrl, fileExt) => {
    const realPath =
      Platform.OS === 'ios' ? fileUrl.replace('file://', '') : fileUrl;
    return RNFetchBlob.fetch(
      'POST',
      `${api_config.baseURL}${url}`,
      await getConfig(),
      [
        {
          name: 'file',
          filename: 'foto.' + fileExt,
          data: RNFetchBlob.wrap(realPath),
        },
        {name: 'file_type', data: '1'},
      ],
    );
  },
  createPost,
};
