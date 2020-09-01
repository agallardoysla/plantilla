import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function VideoOneScreen() {
  const [videoSource, setVideoSource] = useState('');

  const openCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then((image) => {
      console.log(image.path);
      setVideoSource(image.path);
    });
  };

  const mostrarVideo = () => {
    if (Object.keys(videoSource).length !== 0) {
      console.log(videoSource);
      return (
        <>
          <Video
            source={videoSource} // Can be a URL or a local file.
            //ref={(ref) => {
            //  this.player = ref;
            //}} // Store reference
            //onBuffer={this.onBuffer} // Callback when remote video is buffering
            //onError={this.videoError} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
            controls={true}
            fullscreen={true}
            //style={styles.uploadImage}
          />
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>React Native Image Crop Picker (VIDEO)</Text>
      {mostrarVideo()}
      <Button title="Grabar" onPress={openCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f1',
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  backgroundVideo: {
    //position: 'absolute',
    //top: 0,
    left: 30,
    //bottom: 0,
    //right: 20,
    marginBottom: 15,
    width: '100%',
    height: 300,
  },
});
