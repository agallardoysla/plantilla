import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Counter({value, style}) {
  const toDigit = (n, b) => Math.floor(n / b);

  const formatValue = (v) => {
    // Mas de 1 millon
    if (v >= 10 ** 6) {
      return `${toDigit(v, 10 ** 6)} M`;
    }
    // Mas de mil
    if (v >= 10 ** 3) {
      return `${toDigit(v, 10 ** 3)} K`;
    }
    // Menos de mil
    return v;
  };
  return <Text style={[styles.counter, style]}>{formatValue(value)}</Text>;
}

const styles = StyleSheet.create({
  counter: {
    color: 'white',
  },
});