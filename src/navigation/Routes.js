import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import Loading from '../components/Loading';
import {useSelector, useDispatch} from 'react-redux';
import { recoverSession } from '../redux/actions/session';

export default function Routes() {
  const dispatch = useDispatch();

  const checkingForUser = useSelector((state) => state.session.loading);
  const userExists = useSelector((state) => state.session.userExists);

  useEffect(() => {
    dispatch(recoverSession());
  }, []);

  return (
    <NavigationContainer>
      {checkingForUser ? (
        <Loading message="Verificando datos de sesion" />
      ) : userExists ? (
        <HomeStack />
        ) : (
        <AuthStack />
      )}
      {/* <HomeStack/> */}
    </NavigationContainer>
  );
}
