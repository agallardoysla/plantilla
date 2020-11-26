import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Image, Text, Button} from 'react-native';
import posts_services from '../../services/posts_services';
import Publication from './components/Publication';
import Admob from './components/Admob';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getPosts} from '../../reducers/posts';
import {useDispatch, useSelector} from 'react-redux';
import SharePost from './components/SharePost';
import {doAddPosts} from '../../utils/reduxLoader';
import {getShowSharePost} from '../../reducers/showSharePost';
import {addToFeed, fetchFeed} from '../../redux/actions/feed';
import Loading from '../../components/Loading';

export default function HomeScreen({navigation}) {
  const [page, setPage] = useState(1);
  const pages = [20, 10];

  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.feed);
  const fetchingFeed = useSelector((state) => state.feed.fetching);
  // const posts = useSelector(getPosts);
  // const dispatch = useDispatch();
  // // const [reloading, setReloading] = useState(false);

  // const reloadPosts = () => {
  //   // setReloading(true);
  //   // setPage(1);
  //   // posts_services.list(pages[0], 0).then((res) => {
  //   //   dispatch(addPosts(res.data));
  //   //   // setReloading(false);
  //   // });
  // };

  // const getPageOffset = (_page) => {
  //   let res = 0;
  //   for (var i = 0; i < _page; i++) {
  //     res += pages[i];
  //   }
  //   return res;
  // };

  const loadPosts = () => {
    // setReloading(true);
    dispatch(fetchFeed(page, pages));
    // posts_services
    //   .list(
    //     pages[Math.min(page, pages.length - 1)],
    //     getPageOffset(Math.min(page, pages.length - 1)),
    //   )
    //   .then((res) => {
    //     console.log('nuevos posts', res.data.posts);
    //     //  dispatch(doAddPosts(res.data, dispatch));
    //     setPage(page + 1);
    //     // setReloading(false);
    //   });
  };

  const addPosts = () => {
    dispatch(addToFeed(page, pages));
  };

  React.useEffect(() => {
    loadPosts();
  }, []);
  // const PublicationItem = ({ item, index }) => {
  //   return (
  //     <View style={styles.publication}>
  //       <Publication postId={item} navigation={navigation} />
  //       {index % 2 === 1 ? <Admob /> : null}
  //     </View>
  //   );
  // };

  const gotToMyConversations = () => {
    navigation.navigate('MyConversationsGroup', {
      screen: 'MyConversations',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {fetchingFeed ? (
        <Loading />
      ) : (
        feed &&
        feed.length > 0 && (
          <>
            <View style={styles.row_header}>
              <TouchableOpacity onPress={gotToMyConversations}>
                <Image
                  source={require('../../assets/sobre_amarillo.png')}
                  style={styles.sobre_amarillo}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={feed}
              //  onRefresh={() => loadPosts()}
              // refreshing={reloading}
              renderItem={({item, index}) => (
                <Publication
                  key={`${item.id}-${index}`}
                  post={item}
                  isFeed
                  navigation={navigation}
                />
              )}
              onEndReachedThreshold={0.7}
              onEndReached={() => addPosts()}
              bouncesZoom={true}
              keyExtractor={(item, index) => index.toString()}
              style={styles.publications}
            />
          </>
        )
      )}
    </SafeAreaView>

    // <SafeAreaView style={styles.container}>
    //   <View style={styles.row_header}>
    //     <TouchableOpacity onPress={gotToMyConversations}>
    //       <Image
    //         source={require('../../assets/sobre_amarillo.png')}
    //         style={styles.sobre_amarillo}
    //         resizeMode={'contain'}
    //       />
    //     </TouchableOpacity>
    //   </View>
    //   <FlatList
    //     data={posts}
    //     onRefresh={() => reloadPosts()}
    //     refreshing={reloading}
    //     renderItem={PublicationItem}
    //     onEndReachedThreshold={0.7}
    //     onEndReached={loadPosts}
    //     bouncesZoom={true}
    //     keyExtractor={(item, index) => index.toString()}
    //     style={styles.publications}
    //   />
    /* <SharePost /> */
    // </SafeAreaView>
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
  publications: {
    height: 2600,
  },
});
