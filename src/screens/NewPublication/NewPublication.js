import React from 'react';
import Camera from '../Camera/Camera';

export default function NewPublication({navigation}) {
  const callback = (params) => {
    navigation.navigate('PublishPublication', params);
  };

  return (
    <Camera
      navigation={navigation}
      maxImages={5}
      maxDuration={15}
      canGetVideo={true}
      callback={callback}
    />
  );
}
