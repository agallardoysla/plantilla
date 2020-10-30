import React, {useEffect, useContext} from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import StylesConfiguration from '../../utils/StylesConfiguration';
import {AuthContext} from '../../navigation/AuthProvider';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Wellcoming({navigation}) {
  const {setExistProfile} = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setExistProfile(true);
      console.log('existi!!');
    }, 2 * 1000);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.thanks}>¡Gracias!</Text>
      <Text style={styles.text}>Su registro fue creado</Text>
      <Text style={styles.text}>con exito</Text>
      <Text style={styles.text}>Disfruta de</Text>
      <Image
        style={styles.logo}
        source={require('../../assets/logo-home.png')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thanks: {
    fontSize: 28,
    marginBottom: 10,
    color: StylesConfiguration.color,
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
