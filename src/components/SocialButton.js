import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import StylesConfiguration from '../utils/StylesConfiguration';

export function FacebookButton({buttonTitle, ...props}) {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      activeOpacity={0.5}
      {...props}>
      <Image
        style={styles.icon}
        source={require('../assets/facebook_icon.png')}
      />
    </TouchableOpacity>
  );
}

export function GoogleButton({buttonTitle, ...props}) {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      activeOpacity={0.5}
      {...props}>
      <Image
        style={styles.icon}
        source={require('../assets/google_icon.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'black',
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
});
