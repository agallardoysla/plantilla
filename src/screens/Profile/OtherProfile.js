import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedUser} from '../../reducers/loggedUser';
import users_services from '../../services/users_services';
import GenericProfile from './components/GenericProfile';
import {updateOterUser} from '../../redux/actions/otherProfile';
import StylesConfiguration from '../../utils/StylesConfiguration';
import {SafeAreaView} from 'react-native-safe-area-context';
import profiles_services from '../../services/profiles_services';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function OtherProfile({navigation, route}) {
  const user = useSelector((state) => state.session.user);
  const userId = route.params.user_id;
  const isLoggedUser = userId === user.id;
  return <GenericProfile isLoggedUser={isLoggedUser} navigation={navigation} />;
}
