import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {Alert} from 'react-native';

/**
 * Proveedor creado para acceder
 * al usuario en toda la app
 */

export const AuthContext = createContext({});

GoogleSignin.configure({
  webClientId:
    '667632482166-5s9u02g8dtsci93k1cbeve7vqsv8rdo3.apps.googleusercontent.com',
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [existProfile, setExistProfile] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        existProfile,
        setExistProfile,
        login: async (email, password, callback) => {
          try {
            return auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            callback(e.message);
          }
        },
        register: async (email, password, callback) => {
          try {
            return auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            callback(e.message);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
            Alert.alert(e.message);
          }
        },
        loginFacebook: async (callback) => {
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
            callback(e.message);
          }
        },
        loginGoogle: async (callback) => {
          try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(
              idToken,
            );

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
          } catch (e) {
            console.error(e);
            callback(e.message);
          }
        },
        followUser: (newFollowed) => {
          user.following_with_details.push(newFollowed);
          setUser(user);
        },
        unfollowUser: (followed) => {
          console.log(user.following_with_details);
          user.following_with_details = user.following_with_details.filter(
            (f) => f.user_id !== followed.user_id,
          );
          console.log(user.following_with_details);
          setUser(user);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
