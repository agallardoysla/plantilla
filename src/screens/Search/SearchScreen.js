import React from 'react';
import { StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultSearchScreen from './components/DefaultSearchScreen';
import AdvancedSearchScreen from './components/AdvancedSearchScreen';
import Swiper from 'react-native-swiper';

export default function SearchScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        showsButtons={true}
        index={0}
        loop={false}
        showsPagination={false}>
        <DefaultSearchScreen navigation={navigation} />
        <AdvancedSearchScreen navigation={navigation} />
      </Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: 0,
  },
});
