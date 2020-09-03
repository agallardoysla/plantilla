import React, { useState, useEffect, useRef } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native';
import Video from 'react-native-video';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import StylesConfiguration from '../utils/StylesConfiguration';
import FormButton from '../components/FormButton';
import MatInput from '../components/MatInput';
import posts_services from '../services/posts_services';

let window = Dimensions.get('window');

export default function NewPublicationScreen() {
  const [images, setImages] = useState([]);
  const [videoSource, setVideoSource] = useState('');
  const [challengeText, setChallengeText] = useState('');
  const scroll = useRef(null);

  useEffect(() => {
    console.log("Cargado:", images, videoSource);
  });

  //Multiples imágenes. Solo en iOS se puede definir un minimo y un maximo de archivos minFiles (ios only)
  const selectMultipleFile = () => {
    ImageCropPicker.openPicker({
      multiple: true,
    }).then((newImages) => {
      console.log(images);
      setImages(newImages.slice(0, 5));
      setVideoSource('');
      scroll.scrollTo({x: 0, y: 0});
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
      scroll.scrollTo({x: 0, y: 0});
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
      scroll.scrollTo({x: 0, y: 0});
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
        scroll.scrollTo({x: 0, y: 0});
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
        scroll.scrollTo({x: 0, y: 0});
      }
    });
  };

  const doPubliish = () => {
    // const newPost = {
    //   post_type: ,
    //   text,
    //   media,
    //   latitude,
    //   longitude,
    // };

    // posts_services.create(newPost);
  }

  return (
    <View style={styles.container}>
      <ScrollView ref={scroll}>
        <View style={styles.container}>
          <View style={styles.fullRow}>
            <Text style={styles.text_title}>SUBIR</Text>
          </View>
          {videoSource === '' ? (
            <View
              style={
                images.length > 0 || videoSource !== ''
                  ? [styles.fullRow, styles.fullRowContinuous]
                  : styles.limitedScrollView
              }>
              <ScrollView horizontal={true} indicatorStyle="white">
                {images.map((image, i) => (
                  <Image source={{uri: image.path}} style={styles.image} key={i} />
                ))}
                {images.length < 5 ? (
                  <TouchableOpacity
                    onPress={selectSinglePhoto}
                    style={
                      images.length > 0 || videoSource !== ''
                        ? [styles.loadPhotoButton, styles.loadNewPhotoButton]
                        : styles.loadPhotoButton
                    }>
                    <Text style={styles.loadPhoto}>+</Text>
                  </TouchableOpacity>
                ) : null}
              </ScrollView>
            </View>
          ) : null}
          {videoSource !== '' ? (
            <View style={styles.fullRow}>
              <Video
                source={videoSource}
                style={styles.backgroundVideo}
                controls={true}
                fullscreen={true}
              />
            </View>
          ) : null}

          <View
            style={
              images.length > 0 || videoSource !== ''
                ? styles.fullRow
                : styles.columnButtons
            }>
            <FormButton
              style={styles.button}
              buttonTitle="Grabar"
              onPress={filmVideo}
            />
            <FormButton
              style={styles.button}
              buttonTitle="Cargar"
              onPress={selectMultipleFile}
            />
            <FormButton
              style={styles.button}
              buttonTitle="Filtro"
              onPress={() => console.log('filtro..')}
            />
          </View>
          <View style={styles.fullRow}>
            <Text style={styles.text_description}>DESCRIPCIÓN DEL RETO</Text>
          </View>
          <View style={styles.fullRow}>
            <MatInput
              value={challengeText}
              label=""
              onChangeText={setChallengeText}
              containerStyle={styles.input}
              multiline={true}
              textAlignVertical={true}
              numberOfLines={4}
              fontSize={18}
              labelFontSize={18}
            />
          </View>
          {(images.length > 0 || videoSource !== '') && challengeText.length > 0 ? (
            <View style={styles.fullRow}>
              <FormButton
                style={styles.button}
                buttonTitle="PUBLICAR"
                onPress={doPubliish}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

//configuraciones de estilos y aliniamientos de cada componente
const styles = StyleSheet.create({
  //contenedor general
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },

  fullRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  limitedScrollView: {
    width: 100,
    height: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  //titulo
  text_title: {
    fontSize: 20,
    color: StylesConfiguration.color,
    marginVertical: 10,
  },

  //grupo de botones
  fullRowContinuous: {
    paddingRight: 0,
  },
  columnButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    width: 100,
    marginHorizontal: 5,
  },

  //texto de descripcion
  text_description: {
    fontSize: 18,
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    paddingVertical: 15,
  },
  input: {
    width: 250,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: -10,
    marginBottom: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
  },
  loadPhotoButton: {
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: StylesConfiguration.color,
    borderStyle: 'dashed',
  },
  loadNewPhotoButton: {
    width: window.width - 20,
    height: (window.width - 20) * 1.4,
  },
  loadPhoto: {
    color: StylesConfiguration.color,
    fontSize: 40,
  },
  image: {
    width: window.width - 20,
    height: (window.width - 20) * 1.4,
    marginRight: 10,
  },
  backgroundVideo: {
    width: window.width - 20,
    height: (window.width - 20) * 1.4,
  },
});
