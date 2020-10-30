import React, { useState } from 'react';
import {View, StyleSheet, Image, Dimensions, ActivityIndicator} from 'react-native';
import Video from 'react-native-video-player';
import StylesConfiguration from '../../../utils/StylesConfiguration';

let window = Dimensions.get('window');

export default function ImagePostSearch({post}) {
  const [loading, setLoading] = useState(true);

  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  const toView = (file) => {
    return isImage(file.url) ? (
      <Image
        source={{uri: file.url_small}}
        style={loading ? {} : styles.itemImage}
        resizeMode="cover"
        // onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
      />
    ) : (
      <Image
        source={require('../../../assets/boton_play_1.png')}
        style={loading ? {} : styles.itemVideo}
        resizeMode="cover"
        // onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
      />
    );
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
    <View style={styles.itemContainer}>
      {toView(post.files_with_urls[0])}
      {loading && (
        <ActivityIndicator
          size="small"
          color={StylesConfiguration.color}
          style={styles.itemImage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: window.width / 3,
  },
  itemImage: {
    width: window.width / 3,
    height: 120,
  },
  itemVideo: {
    width: 50,
    height: 50,
  },
});
