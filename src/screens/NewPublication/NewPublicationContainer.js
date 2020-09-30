import React, { useContext, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { FeedContext } from '../../navigation/FeedContext';
import NewPublicationScreen from '../NewPublicationScreen';
import Gallery from './Gallery';
import TakePicture from './TakePicture';


const { width } = Dimensions.get('window');

export default function NewPublicationContainer({navigation}) {
  const {setPosts} = useContext(FeedContext);
  const maxImages = 5;
  const maxDuration = 5;
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [challengeText, setChallengeText] = useState('');
  const [publishing, setPublishing] = useState(false);


  return (
    <View style={styles.container}>
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
        index={1}
        loop={false}
        showsPagination={false}
      >
        <Gallery
          style={styles.view}
          maxImages={maxImages}
          images={images}
          setImages={setImages}
        />
        <TakePicture
          style={styles.view}
          navigation={navigation}
          maxDuration={maxDuration}
          maxImages={maxImages}
          images={images}
          setImages={setImages}
          video={video}
          setVideo={setVideo}
        />
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'black',
    alignItems: 'stretch',
  },
  slider: {
  },
  view: {
    width: width,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
});
