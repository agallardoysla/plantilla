import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import GoBackButton from '../../../components/GoBackButton';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import {useSelector} from 'react-redux';
import {getLoggedUserVips} from '../../../reducers/loggedUser';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import Vip from '../components/Vip';

export default ({navigation}) => {
  const loggedFollowers = useSelector(getLoggedUserVips);
  const hasVip = loggedFollowers.length > 0;
  const VipItem = ({item}) => <Vip vip={item} navigation={navigation} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <GoBackButton navigation={navigation} />
        <Text style={styles.titulo}>V.I.P.</Text>
        <View style={styles.placeholder} />
      </View>
      {hasVip ? (
        <FlatList
          style={styles.list}
          data={loggedFollowers}
          renderItem={VipItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text
          style={{
            color: 'yellow',
            textAlign: 'center',
            alignContent: 'center',
            margin: 24,
            fontSize: 18
          }}>
          Sin usuarios V.I.P
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  iconProfile: {
    width: 50,
    height: 50,
  },
  goBack: {
    marginHorizontal: 10,
    marginVertical: 5,
  },

  titulo: {
    fontFamily: StylesConfiguration.fontFamily,
    color: StylesConfiguration.color,
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 10,
  },

  NameProfile: {
    fontFamily: StylesConfiguration.fontFamily,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
