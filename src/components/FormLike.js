import React, {useContext, useEffect, useState} from 'react';
import {View, Image} from 'react-native';

const FormLike = ({iLiked, ...props}) => {
  return (
    <Image
      {...props}
      source={
        iLiked
          ? require('../assets/corazon_limon.png')
          : require('../assets/corazon_gris.png')
      }
    />
  );
};

export default FormLike;
