import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function GoBackButton({navigation, style}) {
  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      style={[styles.container, style]}>
      <Image
        style={styles.boton_back}
        source={require('../assets/boton_volver_atras.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
  },
  boton_back: {
    height: 30,
    width: 30,
  },
});
