import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import StylesConfiguration from '../utils/StylesConfiguration';
import posts_services from '../services/posts_services';
import PublicationsComments from './PublicationsComments';
import CommentInput from '../utils/CommentInput';
import {AuthContext} from '../navigation/AuthProvider';
import CommentFormatter from '../utils/CommentFormatter';

let window = Dimensions.get('window');

export default function ImagePostSearch({post, navigation}) {
  const {user} = useContext(AuthContext);

  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  const toView = (file, i) => {
    return isImage(file.url) ? (
      <Image
        source={{uri: file.url}}
        style={styles.itemImage}
        key={i}
        resizeMode="repeat"
      />
    ) : (
      <Video
        source={{uri: file.url}}
        style={styles.itemImage}
        key={i}
        controls={true}
        fullscreen={false}
      />
    );
  };

  return post.files_with_urls.length > 0 ? (
    <ScrollView horizontal={true} indicatorStyle="white">
      <View style={styles.profilePublications}>
        <View style={styles.itemContainer}>
          {post.files_with_urls.map(toView)}
        </View>
      </View>
    </ScrollView>
  ) : null;
}

const styles = StyleSheet.create({
  profilePublications: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'stretch',
  },

  postImagesContainer: {
    flex: 1,
    height: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 1,
  },
  image_post: {
    width: window.width,
    height: 300,
    top: 20,
  },
  itemContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 120,
  },
  itemImage: {
    flex: 1,
    width: 200,
    height: 200,
    top: 5,
  },
});
