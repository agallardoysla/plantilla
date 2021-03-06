import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function TermsAndConditions() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Terminos y condiciones</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f1',
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
});
