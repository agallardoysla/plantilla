import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import StylesConfiguration from '../../utils/StylesConfiguration';
import FilledButton from '../../components/FilledButton';
import LinkButton from '../../components/LinkButtom';

export default function LandingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido</Text>
      <Text style={styles.text}>a</Text>
      <Image
        style={styles.logo}
        source={require('../../assets/logo-home.png')}
      />
      <FilledButton
        buttonTitle="Ya estoy registrado"
        onPress={() => navigation.navigate('Login')}
      />
      <FilledButton
        buttonTitle="Usuario nuevo"
        onPress={() => navigation.navigate('Signup')}
      />
      <LinkButton
        buttonTitle="Condiciones / Privacidad"
        onPress={() => navigation.navigate('TermsAndConditions')}
      />
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
  text: {
    fontSize: 24,
    marginBottom: 10,
    color: StylesConfiguration.color,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
