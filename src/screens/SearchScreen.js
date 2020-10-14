import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import posts_services from '../services/posts_services';
import {FeedContext} from '../navigation/FeedContext';
import FormSearchInput from '../components/FormSearchInput';
import ImagePostSearch from '../screens/ImagePostSearch';
import ProfileSearch from '../screens/ProfileSearch';
import users_services from '../services/users_services';
import {set} from 'react-native-reanimated';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SearchScreen({navigation}) {
  const {user, logout} = useContext(AuthContext);
  const {posts, setPosts} = useContext(FeedContext);
  const [page, setPage] = useState(0);
  const [valueSearch, setValueSearch] = useState('');
  const [result, setResult] = useState(false);
  const [users, setUsers] = useState([]);
  const [est, setEst] = useState(false);

  useEffect(() => {
    //promesa para traer valor de usuario solo una vez
    users_services.list().then((res) => {
      let usersList = [];
      res.data.forEach((p, i) => {
        usersList.push(p);
      });
      setUsers(usersList);
    });

    if (posts.length === 0) {
      loadPost();
    }
  }, [posts, setPosts]); //los posts se actualizan constantemente pero los perfiles son traidos una vez

  const loadPost = () => {
    posts_services.list(page).then((res) => {
      console.log('nuevos posts', res.data.length);
      setPosts(posts.concat(res.data));
      setPage(page + 1);
    });
  };

  const showSearch = (e) => {
    setValueSearch(e);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={styles.row}>
        <FormSearchInput
          value={valueSearch}
          onChangeText={(e) => showSearch(e)}
        />
      </View>

      <ScrollView>
        {valueSearch.length > 0 ? (
          users.map((item, i) => {
            if (
              item.display_name
                .toLowerCase()
                .indexOf(valueSearch.toLowerCase()) !== -1 &&
              item.id !== user.id
            ) {
              return <ProfileSearch item={item} key={item.id} myId={user.id} />;
            }

            return null;
          })
        ) : (
          <View style={styles.container}>
            <FlatList
              data={posts}
              renderItem={({item, index}) => {
                return <ImagePostSearch post={item} navigation={navigation} />;
              }}
              onEndReachedThreshold={0.6}
              onEndReached={(info) => loadPost()}
              bouncesZoom={true}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: 0,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
});
