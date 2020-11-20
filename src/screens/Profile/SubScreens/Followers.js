import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import GoBackButton from '../../../components/GoBackButton';
import Follower from '../components/Follower';
import FormSearchInput from '../../../components/FormSearchInput';
import utils from '../../../utils/utils.js';
import { useSelector } from 'react-redux';
import { getOtherUserFollowers } from '../../../reducers/otherUser';
import { getLoggedUserFollowers } from '../../../reducers/loggedUser';
import { SafeAreaView } from 'react-native-safe-area-context';

const Followers = ({ navigation, route }) => {
  const loggedFollowers = useSelector(getLoggedUserFollowers);
  const otherFollowers = useSelector(getOtherUserFollowers);
  const [filteredFollowers, setFilteredFollowers] = useState(
    route.params.isLoggedUser ? loggedFollowers : otherFollowers,
  );
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (route.params.isLoggedUser) {
      searchFollowers(searchString, loggedFollowers);
    } else {
      searchFollowers(searchString, otherFollowers);
    }
  }, [searchString]);

  const searchFollowers = (searchedString, followers) => {
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
    <Follower
      follower={item}
      navigation={navigation}
      isLoggedUser={route.params.isLoggedUser}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <GoBackButton navigation={navigation} />
        <Text style={styles.titulo}>SEGUIDORES</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.row}>
        <FormSearchInput value={searchString} onChangeText={setSearchString} />
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
