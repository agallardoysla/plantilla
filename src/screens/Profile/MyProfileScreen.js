import React from 'react';
import {useSelector} from 'react-redux';
import {getUser} from '../../reducers/user';
import GenericProfile from './components/GenericProfile';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function Profile({navigation}) {
  const user = useSelector(getUser);

  return (
    <GenericProfile
      localUser={user}
      isLoggedUser={true}
      navigation={navigation}
    />
  );
};
