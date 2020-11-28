import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FormSearchInput from '../../../components/FormSearchInput';
import GoBackButton from '../../../components/GoBackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import SearchedHashtagsList from './SearchedHashtagsList';
import SearchedProfilesList from './SearchedProfilesList';

/* Datos para popular las busquedas */

const profiles = Array(10).fill({
  id: -1,
  display_name: 'UnPerrito',
  profile: {
    bio: 'una bio',
    photo: {
      url_small: require('../../../assets/pride-dog_1.png'),
    },
  }
});

const hashtags = Array(10).fill({
  name: 'unHashtag',
  posts: Array(3).fill({
    files_with_urls: [{
      url: require('../../../assets/pride-dog_1.png'),
      url_half: require('../../../assets/pride-dog_1.png'),
    }]
  }),
  views: 87498234,
});

export default function AdvancedSearchScreen({ navigation }) {
  const [searchString, setSearchString] = useState('');
  const [filterSelected, setFilterSelected] = useState(0);
  const [profilesSearched, setProfilesSearched] = useState(profiles);
  const [hashtagsSearched, setHashtagsSearched] = useState(hashtags);

  const setFilter = (value) => () => {
    setFilterSelected(value);
    setSearchString('');
  }

  const doShowSearch = (searched) => {
    setSearchString(searched);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <GoBackButton navigation={navigation} />
        <FormSearchInput
          value={searchString}
          onChangeText={(e) => doShowSearch(e)}
          showControls={false}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.row}>
        <View style={[styles.filter, styles.filterLeft]}>
          <TouchableOpacity style={styles.filterButton} onPress={setFilter(0)}>
            <Text style={[
              styles.filterButtonText, 
              filterSelected === 0 
                ? styles.filterButtonTextSelected
                : styles.filterButtonTextNotSelected
              ]}>
              Hashtags
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.filter, styles.filterRight]}>
          <TouchableOpacity style={styles.filterButton} onPress={setFilter(1)}>
            <Text style={[
              styles.filterButtonText, 
              filterSelected === 1 
                ? styles.filterButtonTextSelected
                : styles.filterButtonTextNotSelected
              ]}>
              Perfiles
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {filterSelected === 0
        ? <SearchedHashtagsList
            navigation={navigation}
            hashtags={hashtagsSearched}
          />
        : <SearchedProfilesList
            navigation={navigation}
            profiles={profilesSearched}
          />
      }
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
    paddingHorizontal: 0,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
    marginHorizontal: 5,
  },
  searchInput: {
    marginRight: 30,
  },
  filter: {
    top: -5,
    flex: 1,
    height: 55,
    backgroundColor: '#50555C',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  filterLeft: {
    marginLeft: 40,
    marginRight: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  filterRight: {
    marginRight: 30,
    marginLeft: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  filterButton: {
    height: 55,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 24,
    fontWeight: '500',
    fontFamily: StylesConfiguration.fontFamily,
  },
  filterButtonTextSelected: {
    color: StylesConfiguration.color,
  },
  filterButtonTextNotSelected: {
    color: 'black',
  },
});
