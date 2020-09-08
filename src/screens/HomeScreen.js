import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import posts_services from '../services/posts_services';
import View_Publication from './view_publication';
import {FeedContext} from '../navigation/FeedContext';

export default function HomeScreen() {
  const {posts, setPosts} = useContext(FeedContext);

  useEffect(() => {
    if (posts.length === 0) {
      loadPost();
    }
  });

  const loadPost = () => {
    posts_services.list().then((res) => {
      console.log("nuevos posts", res.data);
      setPosts(posts.concat(res.data));
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={View_Publication}
        onEndReachedThreshold={0.5}
        onEndReached={(info) => loadPost()}
        bouncesZoom={true}
      />
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
});
