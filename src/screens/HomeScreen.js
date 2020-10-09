import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableWithoutFeedback, Image} from 'react-native';
import posts_services from '../services/posts_services';
import {FeedContext} from '../navigation/FeedContext';
import Publication from './Publication';
import Modal from 'react-native-modal';
import FormSearchInput from '../components/FormSearchInput';
import search_services from '../services/search_services';
import users_services from '../services/users_services';
import StylesConfiguration from '../utils/StylesConfiguration';

export default function HomeScreen({navigation}) {
  const {posts, setPosts} = useContext(FeedContext);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [usersSearched, setUsersSearched] = useState([]);
  const [sharedPost, setSharedPost] = useState({});

  useEffect(() => {
    if (posts.length === 0) {
      loadPost();
    }
  });

  const loadPost = () => {
    posts_services.list(page).then((res) => {
      console.log('nuevos posts', res.data.length);
      setPosts(posts.concat(res.data));
      setPage(page + 1);
    });
  };

  const setShowModalAndContext = async (newVal, post) => {
    setShowModal(newVal);
    if (newVal) {
      setSharedPost(post);
      const res = await users_services.getContext({
        search: '',
      });
      console.log(res.data.map(u => u.display_name));
      setUsersSearched(res.data);
    } else {
      setUsersSearched([]);
    }
  }

  const showSearch = (e) => {
    setValueSearch(e);
  };

  const showUserInfo = (user) => {
    console.log(user);
    return user.display_name.slice(0, 20);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => {
          return (
            <Publication
              post={item}
              navigation={navigation}
              showSharePost={setShowModalAndContext}
            />
          );
        }}
        onEndReachedThreshold={0.6}
        onEndReached={(info) => loadPost()}
        bouncesZoom={true}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        isVisible={showModal}
        style={styles.shareModal}
        swipeDirection={['up', 'left', 'right', 'down']}
        onBackButtonPress={() => setShowModalAndContext(false)}
        onBackdropPress={() => setShowModalAndContext(false)}>
        <View style={styles.shareModalContent}>
          <FormSearchInput
            value={valueSearch}
            onChangeText={(e) => showSearch(e)}
          />
          {usersSearched.length > 0 ? (
            <FlatList
              style={styles.usersList}
              data={usersSearched}
              renderItem={({item}) => {
                return (
                  <View style={styles.user}>
                    <Image
                      source={require('../assets/pride-dog_1.png')}
                      resizeMode="contain"
                      style={styles.image}
                    />
                    <Text style={styles.userName}>{showUserInfo(item)}</Text>
                    <Image
                      source={require('../assets/sobre_amarillo_1.png')}
                      resizeMode="contain"
                      style={styles.image}
                    />
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  shareModal: {
    height: 370,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    margin: 0,
  },
  shareModalContent: {
    height: 370,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  usersList: {
    height: 280,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  userName: {
    color: StylesConfiguration.color,
  },
  image: {
    marginHorizontal: 10,
  },
});
