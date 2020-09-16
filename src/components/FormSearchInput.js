import React from 'react';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import StylesConfiguration from '../utils/StylesConfiguration';

export default function FormSearchInput({
  labelValue,
  placeholderText,
  ...rest
}) {
  return (
    <View style={styles.container}>
      <View style={styles.SectionStyle}>
        <Image
          source={require('../assets/lupa.png')}
          style={styles.ImageStyle}
        />
        <TextInput style={{flex: 1, color: 'white'}} underlineColorAndroid="transparent" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  SectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#50555C',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
