import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import GenericProfile from './GenericProfile';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function Profile() {
  const {user} = useContext(AuthContext);

  return <GenericProfile user={user} isLoggedUser={false} />;
};
