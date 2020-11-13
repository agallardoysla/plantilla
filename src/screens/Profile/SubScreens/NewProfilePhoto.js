import React from 'react';
import Camera from '../../Camera/Camera';

export default function NewProfilePhoto({navigation}) {
  const callback = (params) => {
    navigation.navigate('PublishPublication', params);
  };

  return (
    <Camera
      navigation={navigation}
      maxImages={1}
      canGetVideo={false}
      callback={callback}
    />
  );
}
