import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import View_Publication from './view_publication';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/*Boton de retroceder*/}
        <Image style={{top: 10}} source={require('../assets/boton_volver_atras.png')}/>

        {/*Publications */}
        <View_Publication />
        <View_Publication />
        <View_Publication />
        <View_Publication />
        <View_Publication />
        <View_Publication />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
