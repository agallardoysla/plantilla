import React, { useState } from 'react';
import {View, StyleSheet, Image, Dimensions, ActivityIndicator, TouchableOpacity} from 'react-native';
import StylesConfiguration from '../../../utils/StylesConfiguration';

let window = Dimensions.get('window');

export default function PostSearched({post, navigation}) {
  const [loading, setLoading] = useState(true);

  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  const goToPost = () => {
    navigation.navigate('PostGroup', {
      screen: 'PublicationDetails',
      params: {
        post,
      },
    });
  };

  const toView = (file) => {
    // esto es mock
    return (
      <TouchableOpacity onPress={goToPost}>
        <Image
          source={require('../../../assets/photo_1.png')}
          resizeMode="cover"
          style={styles.itemImage}
          onLoad={() => setLoading(false)}
        />
      </TouchableOpacity>
    );

    // esto es lo que realmente se deberia mostrar
    return isImage(file.url) ? (
      <Image
        source={{uri: file.url_half}}
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

const heightWidth = window.width / 3 - 6;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: heightWidth,
    width: heightWidth,
  },
  itemImage: {
    width: heightWidth,
    height: heightWidth,
  },
  itemVideo: {
    width: 50,
    height: 50,
  },
});
