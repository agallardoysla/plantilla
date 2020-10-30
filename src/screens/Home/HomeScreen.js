import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image, Text} from 'react-native';
import posts_services from '../../services/posts_services';
import Publication from './components/Publication';
import Modal from 'react-native-modal';
import FormSearchInput from '../../components/FormSearchInput';
import users_services from '../../services/users_services';
import StylesConfiguration from '../../utils/StylesConfiguration';
import chats_services from '../../services/chats_services';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {addPosts, getPosts} from '../../reducers/posts';
import {useDispatch, useSelector} from 'react-redux';

export default function HomeScreen({navigation}) {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [originalUsersSearched, setOriginalUsersSearched] = useState([]);
  const [usersSearched, setUsersSearched] = useState([]);
  const [sharedPost, setSharedPost] = useState({});
  const pages = [20, 10];
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const res = await users_services.getContext({
        search: '',
      });
      setUsersSearched(res.data);
      setOriginalUsersSearched(res.data); // mover esta logica a HomeStack
    };
    init();
  }, []);

  const getPageOffset = (_page) => {
    let res = 0;
    for (var i = 0; i < _page; i++) {
      res += pages[i];
    }
    return res;
  };

  const loadPost = () => {
    posts_services
      .list(pages[Math.min(page, pages.length - 1)], getPageOffset(page))
      .then((res) => {
        console.log('nuevos posts', res.data.length);
        dispatch(addPosts(res.data));
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
      console.log(res.data.map((u) => u.display_name));
      setUsersSearched(res.data);
      setOriginalUsersSearched(res.data);
    } else {
      setUsersSearched(originalUsersSearched);
      setValueSearch('');
    }
  };

  const showSearch = async (seachedString) => {
    setValueSearch(seachedString);
    if (seachedString.length > 0) {
      setUsersSearched(
        originalUsersSearched.filter((u) =>
          u.display_name.toLowerCase().includes(seachedString.toLowerCase()),
        ),
      );
      if (seachedString.length >= 3) {
        const res = await users_services.getContext({
          search: seachedString,
        });
        console.log(res.data.map((u) => u.display_name));
        setUsersSearched(res.data);
      }
    } else {
      setUsersSearched(originalUsersSearched);
    }
  };

  const showUserInfo = (user) => {
    return user.display_name.slice(0, 20);
  };

  const shareSelectedPost = (userId) => {
    console.log(userId, `[post:${sharedPost.id}]`);
    chats_services.sendMessage(userId, {text: `[post:${sharedPost.id}]`});
    setShowModalAndContext(false);
  };

  const PublicationItem = ({item}) => {
    return (
      <Publication
        post={item}
        navigation={navigation}
        showSharePost={setShowModalAndContext}
      />
    );
  };

  const SearchedProfileItem = ({item}) => {
    return (
      <View style={styles.user}>
        <Image
          source={require('../../assets/pride-dog_1.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.userName}>{showUserInfo(item)}</Text>
        <TouchableOpacity
          style={styles.sendMessage}
          onPress={() => shareSelectedPost(item.id)}>
          <Image
            source={require('../../assets/sobre_amarillo_1.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row_header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyConversations')}>
          <Image
            source={require('../../assets/sobre_amarillo.png')}
            style={styles.sobre_amarillo}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={PublicationItem}
        onEndReachedThreshold={300}
        onEndReached={loadPost}
        bouncesZoom={true}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        isVisible={showModal}
        style={styles.shareModal}
        swipeDirection={['up', 'left', 'right', 'down']}
        onBackButtonPress={() => setShowModalAndContext(false)}
        onBackdropPress={() => setShowModalAndContext(false)}>
        <View style={styles.shareModalContent}>
          <FormSearchInput value={valueSearch} onChangeText={showSearch} />
          {usersSearched.length > 0 ? (
            <FlatList
              style={styles.usersList}
              data={usersSearched}
              renderItem={SearchedProfileItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  row_header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#242424',

    marginBottom: 10,
    marginRight: 5,
  },
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
  shareModal: {
    height: 370,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    margin: 0,
    padding: 0,
  },
  shareModalContent: {
    height: 370,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: 'black',
    margin: 0,
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
  sendMessage: {
    height: 40,
    width: 60,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
