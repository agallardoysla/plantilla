import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import StylesConfiguration from '../utils/StylesConfiguration';

export default function FormSearchInput({labelValue, placeholderText, ...rest }){
  return (  
    <View style={styles.container} >
      <View style={styles.SectionStyle}>
        <Image
          source={require('../assets/lupa.png')}
          style={styles.ImageStyle}
        />
        <TextInput style={styles.texInput} underlineColorAndroid="transparent" {...rest}/>
      </View>
    </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#50555C',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 30,
    borderRadius: 10,
  },
  ImageStyle: {
    margin: 10,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  texInput: {
    flex: 1,
    color: 'white',
    paddingBottom: 5,
  },
});
