import generic_service from './generic_service';
import auth from '@react-native-firebase/auth';
import RNFetchBlob from 'react-native-fetch-blob';
import api_config from './api_config';

const url = 'files/';

const getConfig = async () => {
  const token = await auth().currentUser.getIdToken(true);
  return {
    'Content-Type': 'multipart/mixed',
    'Authorization': `JWT ${token}`,
  };
};

export default {
  list: () => generic_service.doGet(url, true),
  get: (id) => generic_service.doGet(`${url}${id}/`, true),
  create: async (filePath) =>
    RNFetchBlob.fetch(
      'POST',
      `${api_config.baseURL}${url}`,
      await getConfig(),
      [
        {name: 'file', filename: 'foto.jpeg', data: RNFetchBlob.wrap(filePath)},
        {name: 'file_type', data: '1'},
      ],
    ),
};