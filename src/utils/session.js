import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import profiles_services from '../services/profiles_services';
import users_services from '../services/users_services';

export default {
  loginEmail: async (email, password, navigation) => {
    console.log('email', email);
    console.log('password', password);

    try {
      const loginResolve = auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('HomeGroup');
      return loginResolve;
    } catch (e) {
      console.log('error', e);
    }
  },
  register: async (email, password) => {
    try {
      return auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  },
  loginFacebook: async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (e) {
      console.error(e);
    }
  },
  loginGoogle: async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.error(e);
    }
  },
  logout: async () => {
    try {
      return auth().signOut();
    } catch (e) {
      console.error(e);
    }
  },
  createNewAccount: async (newUser, newProfile, nickname, navigation) => {
    await profiles_services.edit(newProfile.id, newProfile);
    navigation.navigate('HomeGroup');
  },
};
