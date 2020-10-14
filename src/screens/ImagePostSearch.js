import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import Video from 'react-native-video-player';

let window = Dimensions.get('window');

export default function ImagePostSearch({post}) {
  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  const toView = (file) => {
    return isImage(file.url) ? (
      <Image
        source={{uri: file.url}}
        style={styles.itemImage}
        resizeMode="cover"
      />
    ) : null;
      // <Video
      //   video={{uri: file.url}}
      //   style={styles.itemImage}
      //   autoplay={false}
      //   defaultMuted={true}
      //   loop={true}
      //   videoWidth={window.width / 3}
      //   videoHeight={120}
      // />
  };

  return (
    <View style={styles.itemContainer}>{toView(post.files_with_urls[0])}</View>
  );
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
    height: 120,
    top: 20,
  },
  itemContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 120,
    width: window.width / 3,
  },
  itemImage: {
    flex: 1,
    width: window.width / 3,
    height: 120,
    top: 5,
  },
});
