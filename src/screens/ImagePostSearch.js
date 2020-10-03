import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Video from 'react-native-video';

let window = Dimensions.get('window');

export default function ImagePostSearch({post}) {
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
