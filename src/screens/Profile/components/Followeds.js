import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import GoBackButton from '../../../components/GoBackButton';
import Followed from './Followed';
import FormSearchInput from '../../../components/FormSearchInput';
import utils from '../../../utils/utils.js';
import { useSelector } from 'react-redux';
import { getUserFolloweds } from '../../../reducers/user';
import { getOtherUserFolloweds } from '../../../reducers/otherUser';


const Followeds = ({ navigation, route }) => {
  const followeds = route.params.isLoggedUser
    ? useSelector(getUserFolloweds)
    : useSelector(getOtherUserFolloweds);
  const [filteredFolloweds, setFilteredFolloweds] = useState(followeds);
  const [searchString, setSearchString] = useState('');

  const searchFolloweds = (searchedString) => {
    setSearchString(searchedString);
    if (searchedString.length > 0) {
      setFilteredFolloweds(
        utils.filterByString(followeds, (f) => f.display_name, searchedString),
      );
    } else {
      setFilteredFolloweds(followeds);
    }
  };

  const FollowedItem = ({ item }) => (
    <Followed follower={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <GoBackButton navigation={navigation} />
        <Text style={styles.titulo}>SEGUIDOS</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.row}>
        <FormSearchInput value={searchString} onChangeText={searchFolloweds} />
      </View>
      <FlatList
        style={styles.list}
        data={filteredFolloweds}
        renderItem={FollowedItem}
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

export default Followeds;
