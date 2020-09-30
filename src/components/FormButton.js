import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import StylesConfiguration from '../utils/StylesConfiguration';

export default function FormButton({buttonTitle, style, textStyle, ...rest}) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} {...rest}>
      <Text style={[styles.buttonText, textStyle]}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 22,
    width: 120,
    height: 43,
    backgroundColor: 'rgb(0,0,0)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: StylesConfiguration.color,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
    color: 'white',
  },
});
