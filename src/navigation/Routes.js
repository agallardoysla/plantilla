import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
//import HomeStack from './HomeStack';
import BottomTab from './BottomTab';
import {AuthContext} from './AuthProvider';
import Loading from '../components/Loading';
import api from '../utils/api';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [existProfile, setExistProfile] = useState(false);

  /* Funcion para manejar cambios de estado del usuario. Acá verifico si el
   ususario está autenticado o no luego ejecutar el useEffect*/

  function onAuthStateChanged(loggedUser) {
    setUser(loggedUser);
    if (loggedUser) {
      api.get(`users/profiles/${loggedUser.uid}/exist/`).then(
        (res) => {
          console.log(res.data.exist === true, loggedUser);
          setExistProfile(res.data.exist);
        },
        (error) => {
          console.log(error.message);
        },
      );
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
      {existProfile ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
