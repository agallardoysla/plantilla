import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styleButton from '../utils/styles';

export default function FormButtonCount({buttonTitle, ...rest}) {
  return (
    <TouchableOpacity style={[styleButton.buttonContainer,styleButton.counter]} {...rest}>
      <Text style={[styleButton.buttonText]}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}