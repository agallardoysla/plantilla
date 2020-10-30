import React from 'react';
import {View, StyleSheet} from 'react-native';
import Publication from './Publication';

export default function PublicationDetails({navigation, route}) {

  return (
    <View style={styles.container}>
      <Publication post={route.params.post} navigation={navigation} showFullContent={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});
