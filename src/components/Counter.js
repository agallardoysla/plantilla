import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function Counter({value, style}) {
  const toDigit = (n, b) => (n / b).toFixed(1);

  const formatValue = (v) => {
    const million = 1000000;
    const thousand = 1000;
    if (v >= million) {
      return `${toDigit(v, million)} M`;
    }
    if (v >= thousand) {
      return `${toDigit(v, thousand)} K`;
    }
    return v;
  };
  return <Text style={[styles.counter, style]}>{formatValue(value)}</Text>;
}

const styles = StyleSheet.create({
  counter: {
    color: 'white',
  },
});
