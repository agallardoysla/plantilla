import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styleButton from '../utils/styles';

export default function FormButtonPatreon({buttonTitle, ...rest}) {
  return (
    <TouchableOpacity style={[styleButton.buttonContainer, styleButton.patreon]} {...rest}>
      <Text style={[styleButton.buttonText]}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}