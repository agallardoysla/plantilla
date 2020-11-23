import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser, login } from '../../../reducers/loggedUser';
import files_services from '../../../services/files_services';
import profiles_services from '../../../services/profiles_services';
import users_services from '../../../services/users_services';
import Camera from '../../Camera/Camera';

export default function NewProfilePhoto({navigation}) {
  const user = useSelector(getLoggedUser);
  const dispatch = useDispatch();

  const callback = async (params) => {
    //console.log('nueva imagen de perfil: ', params.images);
    let path = params.images[0];

    const result = await files_services.createPost(path.uri, path.ext);
    //console.log('RESULT', await result.json());
    const photo = await result.json().id;
    profiles_services.edit(user.profile.id, {photo: photo});
    const backendUser = await users_services.me();
    await AsyncStorage.setItem('local_token', backendUser.data.local_token);
    dispatch(login(backendUser.data));
    navigation.navigate('ProfileEdition');
  };

  return (
    <Camera
      navigation={navigation}
      maxImages={1}
      canGetVideo={false}
      callback={callback}
    />
  );
}
