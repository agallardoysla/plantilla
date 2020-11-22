import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {AuthContext} from './AuthProvider';
import Loading from '../components/Loading';
import users_services from '../services/users_services';
import {login, logout, getLoggedUser} from '../reducers/loggedUser';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Routes() {
  const {existProfile, setExistProfile} = useContext(AuthContext);
  const user = useSelector(getLoggedUser);
  const dispatch = useDispatch();

  /* Funcion para manejar cambios de estado del usuario. Acá verifico si el
   ususario está autenticado o no luego ejecutar el useEffect*/

  async function onAuthStateChanged(isUserLogged) {
    await AsyncStorage.removeItem('local_token');

    if (isUserLogged) {
      await AsyncStorage.setItem('account', 'main');
      if (user) {
        await AsyncStorage.setItem('local_token', user.local_token);
      } else {
        const backendUser = await users_services.me();
        await AsyncStorage.setItem('local_token', backendUser.data.local_token);
        dispatch(login(backendUser.data));
        setExistProfile(backendUser.data.profile.is_ready);
      }
    } else {
      dispatch(logout());
      setExistProfile(false);
    }
  }

  /**
   * Se ejecuta al abrir la app y el método onAuthStateChanged nos permite subscribirnos
   * al estado actual de autenticación del usuario
   */
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!existProfile || !user) {
    return <Loading message="Recuperando datos de sesion" />;
  }

  /**
   * Lógica de ruteo. Si el usuario está autenticado voy a las rutas de HomeStack, sino
   * a las rutas de AuthStack
   */
  console.log('existProfile', existProfile);
  console.log('user', user);

  return (
    <NavigationContainer>
      {existProfile && user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
