import React from 'react';
import {useSelector} from 'react-redux';
import GenericProfile from './components/GenericProfile';

export default function Profile({navigation}) {
  const user = useSelector((state) => state.session.user);

  return (
    <GenericProfile
      localUser={user}
      isLoggedUser={true}
      navigation={navigation}
    />
  );
}
