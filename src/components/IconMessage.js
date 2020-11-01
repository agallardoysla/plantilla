import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FormGoConversations = ({navigation, _styles, ...props}) => {
  return (
    <TouchableOpacity {...props}>
      <Image
        source={require('../assets/sobre_amarillo.png')}
        style={styles.sobre_amarillo}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
});


export default FormGoConversations;
