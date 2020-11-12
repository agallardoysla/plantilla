import React, { useContext, useEffect } from 'react';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import FormButton from '../../../components/FormButton';
import GenericPreferenceView from '../components/GenericPreferenceView';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import users_services from '../../../services/users_services';
import { setAccounts } from '../../../reducers/accounts';
import { AuthContext } from '../../../navigation/AuthProvider';

export default function MyAccount({navigation}) {
  const {logout} = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    users_services.getAccounts().then((res) => {
      console.log('my account', res.data);
      dispatch(setAccounts(res.data));
    });
  }, []);

  const options = [
    {
      label: 'Iniciar con una cuenta diferente',
      action: () => navigation.navigate('CreateNewAccount'),
    },
    {
      label: 'Multicuenta',
      action: () => {},
    },
    {
      label: 'Verificar',
      action: () => {},
    },
    {
      label: 'Cerrar sesión',
      action: logout,
    },
  ];

  return (
    <GenericPreferenceView
      style={styles.container}
      navigation={navigation}
      title={'MI CUENTA'}>
      {options.map((option, i) => (
        <FormButton
          buttonTitle={option.label}
          style={styles.action}
          onPress={option.action}
          key={i}
        />
      ))}
    </GenericPreferenceView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tuercaBlanca: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  text: {
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 18,
    textDecorationLine: 'underline',
    marginBottom: 45,
  },
  action: {
    width: 270,
    borderRadius: 5,
    marginTop: 14,
  },
});
