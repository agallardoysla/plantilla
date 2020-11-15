import React from 'react';
import {useSelector} from 'react-redux';
import {getLoggedUser} from '../../reducers/loggedUser';
import GenericProfile from './components/GenericProfile';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function Profile({navigation}) {
  const user = useSelector(getLoggedUser);

  return (
    <GenericProfile
      localUser={user}
      isLoggedUser={true}
      navigation={navigation}
    />
  );
};
