import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import posts_services from '../services/posts_services';
import {FeedContext} from '../navigation/FeedContext';
import Publication from './Publication';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

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
      <View style={styles.row_header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyConversations')}>
          <Image
            source={require('../assets/sobre_amarillo.png')}
            style={styles.sobre_amarillo}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>

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
