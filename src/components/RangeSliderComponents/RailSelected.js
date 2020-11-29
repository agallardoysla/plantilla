import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import StylesConfiguration from '../../utils/StylesConfiguration';

const RailSelected = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 2,
    backgroundColor: StylesConfiguration.color,
  },
});