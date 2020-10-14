import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import posts_services from '../services/posts_services';
import FormSearchInput from '../components/FormSearchInput';
import ImagePostSearch from '../screens/ImagePostSearch';
import ProfileSearch from '../screens/ProfileSearch';
import users_services from '../services/users_services';
import {ScrollView} from 'react-native-gesture-handler';
import GoBackButton from '../components/GoBackButton';

export default function SearchScreen({navigation}) {
  const {user} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [users, setUsers] = useState([]);
  const pageSize = 24;

  useEffect(() => {
    if (posts.length === 0) {
      loadPost();
    }
    //promesa para traer valor de usuario solo una vez
    users_services.list().then((res) => {
      let usersList = [];
      res.data.forEach((p, i) => {
        usersList.push(p);
      });
      setUsers(usersList);
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

  const showSearch = (e) => {
    setSearchString(e);
  };

  const PostSearchItem = ({item}) => {
    return <ImagePostSearch post={item} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <GoBackButton navigation={navigation} />
        <FormSearchInput
          value={searchString}
          onChangeText={(e) => showSearch(e)}
        />
      </View>
      {searchString.length > 0 ? (
        users.map((item, i) => {
          if (item.display_name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 && item.id !== user.id){
            return <ProfileSearch item={item} key={item.id} myId={user.id} />
          }
          return null;
        })
      ) : (
        <FlatList
          data={posts}
          renderItem={PostSearchItem}
          onEndReachedThreshold={0.8}
          onEndReached={(info) => loadPost()}
          bouncesZoom={true}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      )}
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
