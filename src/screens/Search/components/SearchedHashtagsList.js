import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import HashtagSearched from './HashtagSearched';

export default function SearchedHashtagsList({ navigation, hashtags }) {

  const HashtagsSearchedItem = ({ item }) => {
    return <HashtagSearched hashtag={item} navigation={navigation} />;
  };

  return (
    <FlatList
      data={hashtags}
      renderItem={HashtagsSearchedItem}
      bouncesZoom={true}
      keyExtractor={(item, index) => index.toString()}
      numColumns={1}
    />
  )
}