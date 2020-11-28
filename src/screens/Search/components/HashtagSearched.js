import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Counter from '../../../components/Counter';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import PostSearched from './PostSearched';

export default function HashtagSearched({hashtag, navigation}) {

  const seeAll = () => {
    Alert.alert('ver todo');
  };

  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <View style={[styles.container, styles.containerStart]}>
          <Text style={styles.hashtag}>
            #{hashtag.name}
          </Text>
        </View>
        <View style={[styles.container, styles.containerCenter]}>
          <Counter style={styles.views} value={hashtag.views} />
        </View>
        <View style={[styles.container, styles.containerEnd]}>
          <TouchableOpacity style={styles.seeAll} onPress={seeAll}>
            <Text style={styles.seeAllText}>
              Ver todo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        {hashtag.posts.map((post, i) => (
          <PostSearched post={post} key={i} navigation={navigation} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 13,
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  containerStart: {
    justifyContent: 'flex-start',
  },
  containerCenter: {
    justifyContent: 'center',
  },
  containerEnd: {
    justifyContent: 'flex-end',
  },
  hashtag: {
    fontSize: 16,
    color: '#8A2BE2',
    fontStyle: 'italic',
    fontWeight: '500',
    fontFamily: StylesConfiguration.fontFamily,
  },
  views: {
    fontSize: 16,
    color: 'white',
    fontWeight: '300',
    fontFamily: StylesConfiguration.fontFamily,
  },
  seeAll: {
    backgroundColor: '#35393F',
    width: 76,
    height: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 10,
  },
  seeAllText: {
    fontSize: 12,
    color: 'white',
  },
});
