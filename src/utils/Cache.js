import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export const LOCAL_TOKEN = 'local_token';
export const ACCOUNT = 'local_token';

export default {
  getToken: async (forceJWT) => {
    const _token = await AsyncStorage.getItem(LOCAL_TOKEN);
    const account = await AsyncStorage.getItem(ACCOUNT);
    let isLocalToken = false;

    if (forceJWT || _token === null) {
      token = await auth().currentUser.getIdToken(true);
      token = `${token}@${account}`;
    } else {
      token = _token;
      isLocalToken = true;
    }

    return `${isLocalToken ? 'LJWT' : 'JWT'} ${token}`;
  },
};
