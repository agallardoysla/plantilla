import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import StylesConfiguration from '../utils/StylesConfiguration';

export default function FormButton({buttonTitle, ...rest}) {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 22,
    width: 150,
    height: 43,
    backgroundColor: 'rgb(0,0,0)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: StylesConfiguration.color,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
    color: 'white',
  },
});
