import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import StylesConfiguration from '../utils/StylesConfiguration';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function LoadingScreen({message}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-home.png')}
        fadeDuration={0}
      />
      <Text style={styles.publishing}>{message || 'Ingresando...'}</Text>
      <ActivityIndicator size="large" color={StylesConfiguration.color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: 150,
    height: 150,
  },
  publishing: {
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
});
