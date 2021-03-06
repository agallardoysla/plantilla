import React from 'react';
import {StyleSheet, Image} from 'react-native';

const FormImageIcon = ({_styles, ...props}) => {
  return (
    <Image
      {...props}
      style={[styles.image_profile, _styles]}
    />
  );
};

const styles = StyleSheet.create({
    image_profile: {
        borderRadius: 400 / 2,
      },
})


export default FormImageIcon;
