import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import GenericProfile from './GenericProfile';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function Profile({navigation}) {
  const {user} = useContext(AuthContext);

  return <GenericProfile localUser={user} isLoggedUser={true} navigation={navigation}/>;
};
