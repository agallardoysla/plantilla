import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FormSearchInput from '../../components/FormSearchInput';
import PostSearched from './components/PostSearched';
import ProfileSearched from './components/ProfileSearched';
import search_services from '../../services/search_services';
import GoBackButton from '../../components/GoBackButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSearchedProfiles,
  getSearchedProfiles,
} from '../../reducers/searchedProfiles';
import {getSearchedPosts} from '../../reducers/searchedPosts';

export default function SearchScreen({navigation}) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const dispatch = useDispatch();
  const searchedPosts = useSelector(getSearchedPosts);
  const searchedProfiles = useSelector(getSearchedProfiles);

  const buildUserSearch = (searchingString) => ({
    search: searchingString,
    search_in: 'users',
  });

  const doShowSearch = (searchedString) => {
    setSearchString(searchedString);
    setShowSearch(searchedString.length > 0);
    if (searchedString.length > 0) {
      if (searchedString.length > 3) {
        search_services.search(buildUserSearch(searchedString)).then((res) => {
          dispatch(setSearchedProfiles(res.data.users));
        });
      } else {
        dispatch(
          setSearchedProfiles(
            searchedProfiles.filter((u) =>
              u.display_name
                .toLowerCase()
                .includes(searchedString.toLowerCase()),
            ),
          ),
        );
      }
    } else {
      search_services.search({search_in: 'users'}).then((res) => {
        dispatch(setSearchedProfiles(res.data.users));
      });
    }
  };

  const ProfileSearchItem = ({item}) => {
    return <ProfileSearched profile={item} navigation={navigation} />;
  };

  const PostSearchItem = ({item}) => {
    return <PostSearched post={item} navigation={navigation} />;
  };

  const SearchedUsers = () => (
    <FlatList
      data={searchedProfiles}
      renderItem={ProfileSearchItem}
      bouncesZoom={true}
      keyExtractor={(item) => item.id.toString()}
      numColumns={1}
    />
  );

  const PostsFeed = () => (
    <FlatList
      data={searchedPosts}
      renderItem={PostSearchItem}
      bouncesZoom={true}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <GoBackButton navigation={navigation} />
        <FormSearchInput
          value={searchString}
          onChangeText={(e) => doShowSearch(e)}
        />
      </View>
      {showSearch ? <SearchedUsers /> : <PostsFeed />}
    </View>
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
  text: {
    fontSize: 20,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});
