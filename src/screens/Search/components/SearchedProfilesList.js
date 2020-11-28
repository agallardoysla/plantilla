import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ProfileSearched from './ProfileSearched';

export default function SearchedProfilesList({ navigation, profiles }) {

  const ProfileSearchItem = ({ item }) => {
    return <ProfileSearched profile={item} navigation={navigation} />;
  };

  return (
    <FlatList
      data={profiles}
      renderItem={ProfileSearchItem}
      bouncesZoom={true}
      keyExtractor={(item, index) => index.toString()}
      numColumns={1}
    />
  )
}