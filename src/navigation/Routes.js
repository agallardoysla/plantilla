import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {AuthContext} from './AuthProvider';
import Loading from '../components/Loading';
import users_services from '../services/users_services';

export default function Routes() {
  const {user, setUser, existProfile, setExistProfile} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  /* Funcion para manejar cambios de estado del usuario. Acá verifico si el
   ususario está autenticado o no luego ejecutar el useEffect*/

  async function onAuthStateChanged(loggedUser) {
    setUser(loggedUser);
    if (loggedUser) {
      const backendUser = await users_services.me();
      console.log(backendUser.data.profile.is_ready, loggedUser);
      setExistProfile(backendUser.data.profile.is_ready);
    }
    setLoading(false);
  }

  /**
   * Se ejecuta al abrir la app y el método onAuthStateChanged nos permite subscribirnos
   * al estado actual de autenticación del usuario
   */
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (loading) {
    return <Loading />;
  }

  /**
   * Lógica de ruteo. Si el usuario está autenticado voy a las rutas de HomeStack, sino
   * a las rutas de AuthStack
   */
  return (
    <NavigationContainer>
      {existProfile && user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
