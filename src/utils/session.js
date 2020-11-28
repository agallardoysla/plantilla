import auth from '@react-native-firebase/auth';

export default {
  loginEmail: async (email, password, callback) => {
    try {
     const al = await auth().signInWithEmailAndPassword(email, password);
    //  console.log('al', al)
    } catch (e) {
    //   console.log(e);
    }
  },
  register: async (email, password, callback) => {
    try {
      return auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      //console.log(e);
      callback(e.message);
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
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.error(e);
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
  createNewAccount: async (newUser, newProfile, nickname, navigation) => {
    await profiles_services.edit(newProfile.id, newProfile);
    const newUserModified = await users_services.edit(newUser.id, {
      display_name: nickname,
    });

    dispatch(setLoadingProfile(true));
    dispatch(login(newUserModified.data));
    navigation.navigate('HomeGroup');
  },
};
