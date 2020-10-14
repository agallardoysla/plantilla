import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import StylesConfiguration from '../utils/StylesConfiguration';
import Icon from './Icon';

/* 
  Por algun motivo que no logro descifrar, TextField solo funciona con componentes declarados como clases
*/

class MatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIcon: this.props.secureEntry,
      showPassword: false,
    };
  }

  handleClickShowPassword = () => {
    console.log(this.state.showPassword);
    this.setState({showPassword: !this.state.showPassword});
  };

  render() {
    if (this.state.showIcon) {
      return (
        <TextField
          textColor={'rgb(255,255,255)'}
          tintColor={StylesConfiguration.color}
          baseColor={StylesConfiguration.color}
          titleTextStyle={styles.title}
          labelTextStyle={styles.label}
          secureTextEntry={this.state.showIcon && !this.state.showPassword}
          fontSize={15}
          labelFontSize={15}
          renderRightAccessory={() => (
            <Icon
              onPress={this.handleClickShowPassword}
              showSecondIcon={this.state.showPassword}
              source={require('../assets/visibility_off.png')}
              secondIcon={require('../assets/visibility.png')}
            />
          )}
          {...this.props}
        />
      );
    } else {
      return (
        <TextField
          textColor={'rgb(255,255,255)'}
          tintColor={StylesConfiguration.color}
          baseColor={StylesConfiguration.color}
          titleTextStyle={styles.title}
          labelTextStyle={styles.label}
          fontSize={15}
          labelFontSize={15}
          {...this.props}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'rgb(255,255,255)',
    fontFamily: StylesConfiguration.fontFamily,
    fontWeight: StylesConfiguration.fontWeight,
  },
  label: {
    color: 'rgb(255,255,255)',
    fontFamily: StylesConfiguration.fontFamily,
    fontWeight: StylesConfiguration.fontWeight,
  },
});

export default MatInput;
