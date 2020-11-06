import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../../components/Icon';
import Publication from './Publication';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PublicationDetails({ navigation, route }) {

  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <Publication post={route.params.post} navigation={navigation} showFullContent={true} />
      <View style={{ position: 'absolute', margin: 10, paddingTop: top }}>
        <Icon source={'boton_volver_atras'} onPress={() => navigation.goBack()} />
      </View>
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
