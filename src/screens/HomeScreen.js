import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import posts_services from '../services/posts_services';
import {FeedContext} from '../navigation/FeedContext';
import Publication from './Publication';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomeScreen({navigation}) {
  const {posts, setPosts} = useContext(FeedContext);
  const [page, setPage] = useState(0);

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => {
          return <Publication post={item} navigation={navigation} />;
        }}
        onEndReachedThreshold={0.6}
        onEndReached={(info) => loadPost()}
        bouncesZoom={true}
        keyExtractor={(item) => item.id.toString()}
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
});
