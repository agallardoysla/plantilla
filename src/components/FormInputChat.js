import React from 'react';
import {StyleSheet, TextInput, View, Image} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import StylesConfiguration from '../utils/StylesConfiguration';

export default function FormInput({
  value,
  placeholderText,
  textStyle,
  ...props
}) {
  return (
    <TextInput
      value={value}
      style={[styles.input, textStyle]}
      placeholder={placeholderText}
      placeholderTextColor="gray"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'black',
    borderColor: '#E9FC64',
    fontFamily: StylesConfiguration.fontFamily,
    
  },
});
