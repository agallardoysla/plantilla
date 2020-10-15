import React, {useContext, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {FeedContext} from '../../navigation/FeedContext';
import Gallery from './Gallery';
import TakePicture from './TakePicture';

const {width} = Dimensions.get('window');

export default function NewPublicationContainer({navigation}) {
  const {setPosts} = useContext(FeedContext);
  const maxImages = 5;
  const maxDuration = 5;
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [challengeText, setChallengeText] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [assetType, setAssetType] = useState('Photos');

  const canPublish = () => {
    return images.length > 0 || video !== '';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Swiper 
        style={styles.slider} 
        showsButtons={true}
        loop={true}
        autoplay={false}
        loadMinimal={true}
        loadMinimalSize={1}
        autoplayDirection={false}
      > */}
      <Swiper
        style={styles.slider}
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
          video={video}
          setVideo={setVideo}
          canPublish={canPublish}
          assetType={assetType}
          setAssetType={setAssetType}
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
  slider: {},
  view: {
    width: width,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
