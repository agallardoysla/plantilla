import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import Gallery from './components/Gallery';
import TakePicture from './components/TakePicture';
const { width } = Dimensions.get('window');

export default function Camera({ navigation, maxImages, maxDuration, canGetVideo, callback }) {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [assetType, setAssetType] = useState('Photos');

  const canPublish = () => {
    return images.length || video;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        showsButtons={true}
        index={0}
        loop={false}
        showsPagination={false}>
        <TakePicture
          style={styles.view}
          navigation={navigation}
          maxDuration={maxDuration}
          maxImages={maxImages}
          images={images}
          setImages={setImages}
          video={null}
          setVideo={setVideo}
          canPublish={canPublish}
          assetType={assetType}
          setAssetType={setAssetType}
          canGetVideo={canGetVideo}
          callback={callback}
        />
        <Gallery
          style={styles.view}
          maxImages={maxImages}
          images={images}
          setImages={setImages}
          navigation={navigation}
          video={video}
          setVideo={setVideo}
          canPublish={canPublish}
          assetType={assetType}
          setAssetType={setAssetType}
          canGetVideo={canGetVideo}
          callback={callback}
        />
      </Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'stretch',
  },
  view: {
    width: width,
  },
});
