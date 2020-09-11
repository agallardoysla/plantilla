import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import StylesConfiguration from '../utils/StylesConfiguration';
import FormButton from '../components/FormButton';
import MatInput from '../components/MatInput';
import posts_services from '../services/posts_services';
import files_services from '../services/files_services';
import {FeedContext} from '../navigation/FeedContext';

let window = Dimensions.get('window');

export default function NewPublicationScreen({navigation}) {
  const {setPosts} = useContext(FeedContext);
  const [images, setImages] = useState([]);
  const [videoSource, setVideoSource] = useState('');
  const [challengeText, setChallengeText] = useState('');
  const [publishing, setPublishing] = useState(false);

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

  const doPubliish = async () => {
    setPublishing(true);
    const paths = images.length > 0 ? images.map((image) => image.path) : [videoSource];

    const filesIds = await Promise.all(
      paths.map(async (path) => {
        const result = await files_services.create(path);
        return await result.json().id;
      }),
    );

    console.log(filesIds);

    if (filesIds.length > 0) {
      const newPost = {
        post_type: 1,
        latitude: 'latitude',
        longitude: 'longitude',
        files: filesIds,
      };
      if (challengeText.length > 0) {
        newPost.text = challengeText;
      }

      await posts_services.create(newPost);
      posts_services.list().then((res) => {
        setImages([]);
        setVideoSource('');
        setChallengeText('');
        setPublishing(false);
        setPosts(res.data);
        navigation.navigate('HomeGroup');
      });
    }
  };

  return (
    <View style={styles.container}>
      {!publishing ? (
        <ScrollView>
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
                    <Image source={{ uri: image.path }} style={styles.image} key={i} />
                  ))}
                  {images.length < 5 ? (
                    <TouchableOpacity
                      onPress={openPhotoCamera}
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
            {images.length > 0 || videoSource !== '' ? (
              <View style={styles.fullRow}>
                <FormButton
                  style={styles.publishButton}
                  buttonTitle="PUBLICAR"
                  onPress={doPubliish}
                />
              </View>
            ) : null}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Text style={styles.publishing}>Publicando...</Text>
          <ActivityIndicator size="large" color={StylesConfiguration.color} />
        </View>
      )}
    </View>
  );
}

//configuraciones de estilos y aliniamientos de cada componente
const styles = StyleSheet.create({
  //contenedor general
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
  publishButton: {
    marginBottom: 20,
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
  publishing: {
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
});
