import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styleButton from '../utils/styles';

export default function FormButtonVip({buttonTitle, ...rest}) {
  return (
    <TouchableOpacity style={[styleButton.buttonContainer, styleButton.vipButton]} {...rest}>
      <Text style={[styleButton.buttonText, styleButton.vipContent]}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}