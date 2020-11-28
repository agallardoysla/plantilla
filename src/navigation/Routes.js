import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import Loading from '../components/Loading';
import {useSelector, useDispatch} from 'react-redux';
import {checkSessionActive, recoverSession} from '../redux/actions/session';

export default function Routes() {
  const dispatch = useDispatch();

  const checkingForUser = useSelector((state) => state.session.loading);
  const userExists = useSelector((state) => state.session.userExists);
  const sessionIsActive = useSelector((state) => state.session.isSessionActive);

  useEffect(() => {
    dispatch(checkSessionActive());
    if (sessionIsActive) {
      dispatch(recoverSession());
    }
  }, [sessionIsActive]);

  return (
    <NavigationContainer>
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
