import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import posts_services from '../../services/posts_services';
import FormSearchInput from '../../components/FormSearchInput';
import ImagePostSearch from './ImagePostSearch';
import ProfileSearch from './ProfileSearch';
import search_services from '../../services/search_services';
import GoBackButton from '../../components/GoBackButton';

export default function SearchScreen({navigation}) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [users, setUsers] = useState([]);
  const pageSize = 24;

  useEffect(() => {
    if (posts.length === 0) {
      loadPost();
    }
    //promesa para traer valor de usuario solo una vez
    search_services.search(buildUserSearch(searchString)).then((res) => {
      console.log(res.data.users[0]);
      setUsers(res.data.users);
    });
  }, []);

  const getPageOffset = (_page) => pageSize * _page;

  const loadPost = () => {
    posts_services.list(pageSize, getPageOffset(page)).then((res) => {
      console.log('nuevos posts', res.data.length);
      setPosts([...posts, ...res.data]);
      setPage(page + 1);
    });
  };

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
          console.log(res.data);
          setUsers(res.data);
        });
      } else {
        setUsers(
          users.filter((u) =>
            u.display_name.toLowerCase().includes(searchedString.toLowerCase()),
          ),
        );
      }
    }
  };

  const ProfileSearchItem = ({item}) => {
    return <ProfileSearch user={item} navigation={navigation} />;
  };

  const PostSearchItem = ({item}) => {
    return <ImagePostSearch post={item} navigation={navigation} />;
  };

  const SearchedUsers = () => (
    <FlatList
      data={users}
      renderItem={ProfileSearchItem}
      bouncesZoom={true}
      keyExtractor={(item) => item.id.toString()}
      numColumns={1}
    />
  );

  const PostsFeed = () => (
    <FlatList
      data={posts}
      renderItem={PostSearchItem}
      onEndReachedThreshold={0.8}
      onEndReached={(info) => loadPost()}
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
