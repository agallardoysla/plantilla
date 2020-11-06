import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const IconMessage = ({ navigation, _styles, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Image
        source={require('../assets/sobre_amarillo.png')}
        style={styles.sobre_amarillo}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
});


export default IconMessage;
