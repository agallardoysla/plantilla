import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import Loading from '../components/Loading';
import {useSelector, useDispatch} from 'react-redux';
import {
  checkSessionActive,
  logout,
  recoverSession,
} from '../redux/actions/session';
import {getSessionIsActive} from '../redux/reducers/session';
import Toast from 'react-native-toast-message';
import feed from '../redux/reducers/feed';
import {setPrueba} from '../redux/reducers/prueba';

export default function Routes() {
  const dispatch = useDispatch();

  const checkingForUser = useSelector((state) => state.session.loading);
  const userExists = useSelector((state) => state.session.userExists);
  const sessionIsActive = useSelector(getSessionIsActive);

  const {prueba} = useSelector((state) => state.prueba);

  console.log('Routesjs', prueba);

  useEffect(() => {
    dispatch(checkSessionActive());
    if (sessionIsActive) {
      dispatch(recoverSession());
    }
  }, [dispatch, sessionIsActive]);

  useEffect(() => {
    //Cerrar sesión
    // dispatch(logout());
    // dispatch(setPrueba('adfa'));
  }, []);

  return (
    <NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />

      {checkingForUser ? (
        <Loading message="Verificando datos de sesion" />
      ) : sessionIsActive && userExists ? (
        <HomeStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
