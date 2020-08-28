import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import StylesConfiguration from '../utils/StylesConfiguration';
import Video from 'react-native-video';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function NewPublicationScreen() {
  const {user, logout} = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const [videoSource, setVideoSource] = useState('');

  //Multiples imágenes. Solo en iOS se puede definir un minimo y un maximo de archivos minFiles (ios only)
  const selectMultipleFile = () => {
    ImageCropPicker.openPicker({
      multiple: true,
    }).then((newImages) => {
      console.log(images);
      setImages(newImages.slice(0, 5));
      setVideoSource('');
    });
  };

  const selectSinglePhoto = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then((newImage) => {
      console.log(newImage);
      const newImages = [...images];
      newImages.push(newImage);
      setImages(newImages);
      setVideoSource('');
    });
  };

  const openPhotoCamera = () => {
    ImageCropPicker.openCamera({
      cropping: true,
    }).then((newImage) => {
      console.log(newImage);
      const newImages = [...images];
      newImages.push(newImage);
      setImages(newImages);
      setVideoSource('');
    });
  };

  const videoOptions = {
    title: 'Cargar video',
    mediaType: 'video',
    durationLimit: 15,
    path: 'video',
    quality: 1,
  };

  const selectVideo = () => {
    ImagePicker.launchImageLibrary(videoOptions, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setVideoSource(response);
        setImages([]);
      }
    });
  }

  const filmVideo = () => {
    ImagePicker.launchCamera(videoOptions, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setVideoSource(response);
        setImages([]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {videoSource === '' ?
            (<ScrollView horizontal={true} indicatorStyle='white'>
              {images.map((image, i) => (
                <Image source={{uri: image.path}} style={styles.image} key={i} />
              ))}
              {images.length < 5 ?
                <TouchableOpacity
                  onPress={selectSinglePhoto}
                  style={styles.loadPhotoButton}>
                  <Text style={styles.loadPhoto}>+</Text>
                </TouchableOpacity>
              : null}
            </ScrollView>)
            : null}
          {videoSource != '' ?
            (<Video
              source={videoSource}
              style={styles.backgroundVideo}
              controls={true}
              fullscreen={true}
            />)
          : null}
          <View style={styles.buttonsContainerContainer}>
            <View style={styles.buttonsContainer}>
              <FormButton buttonTitle="Subir fotos" onPress={selectMultipleFile} style={styles.button}/>
              <FormButton buttonTitle="Subir video" onPress={selectVideo} style={styles.button} />
            </View>
            <View style={styles.buttonsContainer}>
              <FormButton buttonTitle="Sacar foto" onPress={openPhotoCamera} style={styles.button} />
              <FormButton buttonTitle="Grabar video" onPress={filmVideo} style={styles.button} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: 150,
    height: 200,
    marginRight: 10,
  },
  loadPhotoButton: {
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: StylesConfiguration.color,
    borderStyle: 'dashed',
  },
  loadPhoto: {
    color: StylesConfiguration.color,
    fontSize: 40,
  },
  backgroundVideo: {
    marginBottom: 15,
    width: 150,
    height: 200,
    borderWidth: 2,
    borderColor: StylesConfiguration.color,
  },
  buttonsContainerContainer: {
    marginTop: 80,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 10,
  },
});