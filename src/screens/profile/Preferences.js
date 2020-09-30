import React, { useContext } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import StylesConfiguration from '../../utils/StylesConfiguration';
import FormButton from '../../components/FormButton';
import { AuthContext } from '../../navigation/AuthProvider';

export default function Preferences({navigation}) {
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        style={styles.tuercaBlanca}
        source={require('../../assets/tuerca_blanca_grande.png')}
      />
      <Text style={styles.text}>PREFERENCIAS</Text>
      <FormButton buttonTitle="Editar perfil" style={styles.action} />
      <FormButton buttonTitle="Mi cuenta" style={styles.action} />
      <FormButton buttonTitle="Privacidad" style={styles.action} />
      <FormButton buttonTitle="Seguridad" style={styles.action} />
      <FormButton buttonTitle="Condiciones y política de uso" style={styles.action} />
      <FormButton buttonTitle="Logout" style={styles.action} onPress={logout} />
      <FormButton buttonTitle="Eliminar cuenta" style={styles.action} />
    </View>
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
