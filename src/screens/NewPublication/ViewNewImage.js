import { CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function ViewNewImage({route}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: route.params.uri}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
  },
});
