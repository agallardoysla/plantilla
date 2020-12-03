/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Image, RefreshControl} from 'react-native';
import Publication from './components/Publication';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToFeed,
  fetchFeed,
  fetchFeedFromGesture,
} from '../../redux/actions/feed';
import Loading from '../../components/Loading';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.feed);
  const fetchingFeed = useSelector((state) => state.feed.fetching);
  const fetchingFromGesture = useSelector(
    (state) => state.feed.fetchingFromFeed,
  );
  const [minHeight, toggleMinHeight] = useState({
    keyboardState: false,
    keyboardSpace: 0,
  });
  const loadPosts = () => {
    dispatch(fetchFeed(15, 0));
  };

  const addPosts = () => {
    dispatch(addToFeed(15, feed.length));
  };

  const refreshFromGesture = () => {
    dispatch(fetchFeedFromGesture(15, 0));
  };

  React.useEffect(() => {
    loadPosts();
  }, []);

  const PublicationItem = ({item, index}) => {
    return (
      <View style={styles.publication} key={`${item.id}-${index}`}>
        <Publication post={item} navigation={navigation} isFeed={true} />
      </View>
    );
  };

  const gotToMyConversations = () => {
    navigation.navigate('MyConversationsGroup', {
      screen: 'MyConversations',
    });
  };

  return (
    <SafeAreaView style={{...styles.container}}>
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
            <View style={{flex: 1}}>
              <FlatList
                maxToRenderPerBatch={3}
                updateCellsBatchingPeriod={120}
                data={feed}
                refreshControl={
                  <RefreshControl
                    enabled={true}
                    colors={['#00ff00', '#00ff00']}
                    tintColor={'#E9FC64'}
                    refreshing={fetchingFromGesture}
                    onRefresh={() => refreshFromGesture()}
                  />
                }
                renderItem={PublicationItem}
                onEndReachedThreshold={0.7}
                onEndReached={() => addPosts()}
                bouncesZoom={true}
                keyExtractor={(item, index) => index.toString()}
                style={
                  minHeight.keyboardState
                    ? styles.publications
                    : styles.publicationsWithHeight
                }
              />
              <KeyboardSpacer
                topSpacing={15}
                onToggle={(keyboardState, keyboardSpace) =>
                  toggleMinHeight({keyboardState, keyboardSpace})
                }
              />
            </View>
          </>
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'black',
  },
  row_header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#242424',
  },
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
  publications: {
    flex: 1,
  },
  publicationsWithHeight: {
    flex: 1,
    minHeight: 731,
  },
});
