import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import GoBackButton from '../../../components/GoBackButton';
import Follower from './Follower';
import FormSearchInput from '../../../components/FormSearchInput';
import utils from '../../../utils/utils.js';
import { useSelector } from 'react-redux';
import { getOtherUserFollowers } from '../../../reducers/otherUser';
import { getUserFollowers } from '../../../reducers/user';

const Followers = ({ navigation, route }) => {
  const followers = route.params.isLoggedUser
    ? useSelector(getUserFollowers)
    : useSelector(getOtherUserFollowers);
  const [filteredFollowers, setFilteredFollowers] = useState(followers);
  const [searchString, setSearchString] = useState('');

  const searchFollowers = (searchedString) => {
    setSearchString(searchedString);
    if (searchedString.length > 0) {
      setFilteredFollowers(
        utils.filterByString(followers, (f) => f.display_name, searchedString),
      );
    } else {
      setFilteredFollowers(followers);
    }
  };

  const FollowerItem = ({ item }) => (
    <Follower follower={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <GoBackButton navigation={navigation} />
        <Text style={styles.titulo}>SEGUIDORES</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.row}>
        <FormSearchInput value={searchString} onChangeText={searchFollowers} />
      </View>
      <FlatList
        style={styles.list}
        data={filteredFollowers}
        renderItem={FollowerItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  placeholder: {
    width: 30, // mismo ancho que el boton de volver atras
  },
  titulo: {
    fontFamily: StylesConfiguration.fontFamily,
    color: StylesConfiguration.color,
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});

export default Followers;
