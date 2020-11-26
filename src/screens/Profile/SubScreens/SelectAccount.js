import React from 'react';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import FormButton from '../../../components/FormButton';
import GenericPreferenceView from '../components/GenericPreferenceView';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, setAccounts } from '../../../reducers/accounts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoadingProfile } from '../../../reducers/loadingProfile';
import { setLoadingOtherProfile } from '../../../reducers/loadingOtherProfile';

export default function SelectAccount({navigation}) {
  const dispatch = useDispatch();
  const accounts = useSelector(getAccounts);

  const selectAccount = (account) => async () => {
    await AsyncStorage.setItem('account', account.account);
    dispatch(setLoadingOtherProfile(true));
    navigation.navigate('HomeGroup');
    dispatch(setLoadingProfile(true));
  };

  const options = [
    ...accounts.map((account) => ({
      label: account.display_name,
      action: selectAccount(account),
    })),
    {
      label: 'Crear nueva cuenta',
      action: () => navigation.navigate('CreateNewAccount'),
    },
    {
      label: 'editar perfil',
      action: () => navigation.navigate('VerifyAccount'),
    },
  ].slice(0, 5);

  return (
    <GenericPreferenceView
      style={styles.container}
      navigation={navigation}
      title={'SELECCIONAR CUENTA'}>
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
