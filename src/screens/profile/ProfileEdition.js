import React, { useContext } from 'react';
import StylesConfiguration from '../../utils/StylesConfiguration';
import FormButton from '../../components/FormButton';
import GenericPreferenceView from './GenericPreferenceView';
import { Image, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';

export default function Preferences({navigation}) {
  const {user} = useContext(AuthContext);

  return (
    <GenericPreferenceView style={styles.container} navigation={navigation} title={'EDITAR PERFIL'}>
      <Image
        source={require('../../assets/foto_perfil_superior.png')}
        style={styles.circle_image}
      />
      <FormButton
        buttonTitle="Cambiar foto de perfil"
        style={styles.action}
        onPress={() => Alert.alert('editar perfil')}
      />
      <Text style={styles.userName}>@{user.display_name}</Text>
      <FormButton
        buttonTitle="Cambiar nombre de usuario"
        style={styles.action}
        onPress={() => Alert.alert('mi cuenta')}
      />
      <Text style={styles.userDescription}>
        BullDog frances que vive en burzaco me gusta dormir y comer todo el dia. Mi juguete favorito es la hamburguesa
      </Text>
      <FormButton
        buttonTitle="Modificar descripción del perfil"
        style={styles.action}
        onPress={() => Alert.alert('privacidad')}
      />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
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
    marginTop: 0,
  },
  circle_image: {
    height: 130,
    width: 130,
    borderRadius: 65,
    marginBottom: 10,
  },
  userName: {
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 18,
    textAlign: 'center',
    color: StylesConfiguration.color,
    marginTop: 27,
    marginBottom: 10,
  },
  userDescription: {
    color: StylesConfiguration.color,
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 70,
    marginTop: 27,
    marginBottom: 10,
  },
});
