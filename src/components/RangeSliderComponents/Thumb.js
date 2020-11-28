import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import StylesConfiguration from '../../utils/StylesConfiguration';

const THUMB_RADIUS = 12;

const Thumb = () => {
  return (
    <View style={styles.root}/>
  );
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    backgroundColor: StylesConfiguration.color,
    borderWidth: THUMB_RADIUS - 4,
    borderColor: 'rgba(0,0,0,0)'
  },
});

export default memo(Thumb);