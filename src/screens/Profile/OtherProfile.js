import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getOtherUser} from '../../redux/actions/otherProfile';
import GenericProfile from './components/GenericProfile';
import {_} from 'lodash';
import LoadingScreen from '../../components/Loading';
//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function OtherProfile({navigation, route}) {
  const user = useSelector((state) => state.session.user);
  const userId = route.params.user_id;
  const isLoggedUser = userId === user.id;
  const fetchingProfile = useSelector((state) => state.otherProfile.fetching);
  const otherUser = useSelector((state) => state.otherProfile.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedUser) {
      dispatch(getOtherUser(userId));
    }
  }, [userId]);

  return fetchingProfile ? (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <LoadingScreen message="Redirigiendo a perfil" />
    </View>
  ) : (
    <GenericProfile
      isLoggedUser={true}
      navigation={navigation}
      localUser={isLoggedUser ? user : otherUser}
    />
  );
}
