import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, Text } from 'react-native';
import posts_services from '../../services/posts_services';
import Publication from './components/Publication';
import KBView from '../../components/KBView';
import Admob from './components/Admob';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addPosts, getPosts } from '../../reducers/posts';
import { useDispatch, useSelector } from 'react-redux';
import SharePost from './components/SharePost';

export default function HomeScreen({ navigation }) {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [sharedPost, setSharedPost] = useState({});
  const pages = [20, 10];
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();
  const [reloading, setReloading] = useState(false);


  const reloadPosts = () => {
    // setReloading(true);
    // setPage(1);
    // posts_services.list(pages[0], 0).then((res) => {
    //   dispatch(addPosts(res.data));
    //   // setReloading(false);
    // });
  };

  const getPageOffset = (_page) => {
    let res = 0;
    for (var i = 0; i < _page; i++) {
      res += pages[i];
    }
    return res;
  };

  const loadPosts = () => {
    // setReloading(true);
    posts_services
      .list(
        pages[Math.min(page, pages.length - 1)],
        getPageOffset(Math.min(page, pages.length - 1)),
      )
      .then((res) => {
        console.log('nuevos posts', res.data.length);
        dispatch(addPosts(res.data));
        setPage(page + 1);
        // setReloading(false);
      });
  };

  const showSharePost = async (post) => {
    setShowModal(true);
    setSharedPost(post);
  };

  const PublicationItem = ({ item, index }) => {
    if (index % 3 === 2) {
      return <Admob />;
    } else {
      return (
        <Publication
          postId={item.id}
          navigation={navigation}
          showSharePost={showSharePost}
        />
      );
    }
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
        onRefresh={() => reloadPosts()}
        refreshing={reloading}
        renderItem={PublicationItem}
        onEndReachedThreshold={300}
        onEndReached={loadPosts}
        bouncesZoom={true}
        keyExtractor={(item, index) => index.toString()}
      />
      <SharePost
        showModal={showModal}
        setShowModal={setShowModal}
        sharedPost={sharedPost}
      />
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
});
