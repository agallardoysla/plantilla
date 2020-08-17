import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import StylesConfiguration from '../utils/StylesConfiguration';

/* 
  Por algun motivo que no logro descifrar, TextField solo funciona con componentes declarados como clases
*/

class MatInput extends Component {
  render() {
    return (
      <TextField
        {...this.props}
        textColor={'rgb(255,255,255)'}
        tintColor={StylesConfiguration.color}
        baseColor={StylesConfiguration.color}
        labelTextStyle={styles.title}
      />
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'rgb(255,255,255)',
  },
  input: {
    width: 50,
    height: 20,
  },
});

export default MatInput;
