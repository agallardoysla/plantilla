import React from 'react';
import {View, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Publication from './Publication';

export default function PublicationDetails({navigation, route}) {

  return (
    <View style={styles.container}>
      <FlatList
        data={[route.params.post]}
        renderItem={({item}) => {
          return <Publication post={item} navigation={navigation} />;
        }}
        bouncesZoom={true}
        keyExtractor={(item) => item.id.toString()}
      />
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
