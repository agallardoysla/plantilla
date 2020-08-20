import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import StylesConfiguration from '../utils/StylesConfiguration';
import {Icon} from 'react-native-elements';

/* 
  Por algun motivo que no logro descifrar, TextField solo funciona con componentes declarados como clases
*/

class MatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIcon: this.props.secureTextEntry,
      showPassword: false,
    };
  }

  handleClickShowPassword = () => {
    console.log(this.state.showPassword);
    this.setState({showPassword: !this.state.showPassword});
  }

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
          renderRightAccessory={() =>
            this.state.showPassword ? (
              <Icon
                onPress={this.handleClickShowPassword}
                name="visibility-off"
                color="#FFFFFF"
              />
            ) : (
              <Icon
                onPress={this.handleClickShowPassword}
                name="visibility"
                color="#FFFFFF"
              />
            )
          }
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
