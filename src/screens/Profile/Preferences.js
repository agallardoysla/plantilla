import React from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import StylesConfiguration from '../../utils/StylesConfiguration';
import FormButton from '../../components/FormButton';
import GoBackButton from '../../components/GoBackButton';

export default function Preferences({navigation}) {
  const options = [
    {
      label: 'Editar perfil',
      action: () => navigation.navigate('ProfileEdition'),
    },
    // {
    //   label: 'Mi cuenta',
    //   action: () => navigation.navigate('MyAccount'),
    // },
    // {
    //   label: 'Privacidad',
    //   action: () => Alert.alert("Privacidad"),
    // },
    // {
    //   label: 'Seguridad',
    //   action: () => Alert.alert("Seguridad"),
    // },
    // {
    //   label: 'Condiciones y política de uso',
    //   action: () => Alert.alert("CyP"),
    // },
    // {
    //   label: 'Eliminar cuenta',
    //   action: () => Alert.alert("Eliminar cuenta"),
    // },
  ];

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 5,
          paddingTop: 35,
          backgroundColor: 'black'
        }}>
        <GoBackButton navigation={navigation} />
      </View>
      <View style={styles.container}>
        <Image
          style={styles.tuercaBlanca}
          source={require('../../assets/tuerca_blanca_grande.png')}
        />
        <Text style={styles.text}>PREFERENCIAS</Text>
        {options.map((option, i) => (
          <FormButton
            buttonTitle={option.label}
            style={styles.action}
            onPress={option.action}
            key={i}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
