import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Publication from './Publication';

export default function PublicationDetails({ navigation, route }) {

  return (
    <SafeAreaView style={styles.container}>
      <Publication post={route.params.post} navigation={navigation} showFullContent={true} />
    </SafeAreaView>
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
