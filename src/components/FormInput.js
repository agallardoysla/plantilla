import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import StylesConfiguration from '../utils/StylesConfiguration';

export default function FormInput({labelValue, placeholderText, ...rest}) {
  return (
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor="#666"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#E9FC64',
    fontFamily: StylesConfiguration.fontFamily,
  },
});
