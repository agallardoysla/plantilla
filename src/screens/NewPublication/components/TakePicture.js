import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
  Dimensions,
  Pressable,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from '../../../components/Icon';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import CameraRoll from '@react-native-community/cameraroll';
import Video from 'react-native-video-player';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Esperando permisos...</Text>
  </View>
);

let window = Dimensions.get('window');

export default function TakePicture({
  navigation,
  maxDuration,
  maxImages,
  images,
  setImages,
  video,
  setVideo,
  canPublish,
  assetType,
  setAssetType,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [timeCounter, setTimeCounter] = useState(maxDuration);
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.on);
  const [flash, setFlash] = useState(0);
  const [cameraMode, setCameraMode] = useState(RNCamera.Constants.Type.back);
  const [_camera, setCamera] = useState(0);

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const takePicture = async (camera) => {
    if (images.length < maxImages) {
      // const options = { base64: true };
      const options = { quality: 0.5 };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
      const asset = {
        uri: data.uri,
        ext: data.uri.split('.')[1].toLowerCase(),
      }
      setImages([...images, asset]);
      setVideo(null);
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }
      CameraRoll.save(data.uri);
      // setAssetType('Photo');
    }
  };

  const recordVideo = async (camera) => {
    setIsRecording(true);
    let localCounter = timeCounter;
    const timeCounterInterval = setInterval(() => {
      if (--localCounter >= 0) {
        setTimeCounter(localCounter);
      }
    }, 1000);
    const options = {
      quality: RNCamera.Constants.VideoQuality['720p'],
      maxDuration,
    };
    const data = await camera.recordAsync(options);
    clearInterval(timeCounterInterval);
    setTimeCounter(maxDuration);
    setIsRecording(false);
    console.log(data.uri);
    setVideo(data.uri);
    setImages([]);
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.save(data.uri);
    // setAssetType('Video');
  };

  const stopRecording = async (camera) => {
    camera.stopRecording();
  };

  const turnFlash = () => {
    if (flash === 0) {
      setFlashMode(RNCamera.Constants.FlashMode.on);
      setFlash(1);
    }
    if (flash === 1) {
      setFlashMode(RNCamera.Constants.FlashMode.off);
      setFlash(2);
    }
    if (flash === 2) {
      setFlashMode(RNCamera.Constants.FlashMode.auto);
      setFlash(0);
    }
  };

  const iconSize = 32;

  const GetFlashIcon = () => {
    const flashIcons = ['flash_auto', 'flash_on', 'flash_off'];
    return (
      <Icon
        onPress={turnFlash}
        source={flashIcons[flash]}
        color="#FFFFFF"
        size={iconSize}
        style={styles.cameraControl}
      />
    );
  };

  const GetSwitchCameraIcon = () => {
    const cameraIcons = ['camera_rear', 'camera_front'];
    return (
      <Icon
        onPress={flipCamera}
        source={cameraIcons[_camera]}
        color="#FFFFFF"
        size={iconSize}
        style={styles.cameraControl}
      />
    );
  };

  const flipCamera = () => {
    if (_camera === 0) {
      setCameraMode(RNCamera.Constants.Type.front);
      setCamera(1);
    }
    if (_camera === 1) {
      setCameraMode(RNCamera.Constants.Type.back);
      setCamera(0);
    }
  };

  const twoDigits = (n) => (n < 10 ? '0' + n : n);

  const tryEdit = () => {
    Alert.alert('Editar imagen');
  };

  const tryDelete = () => {
    Alert.alert(
      '¿Quitar video de la publicación?',
      'En la galeria se puede agregar nuevamente',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: doDelete,
        },
      ],
      { cancelable: false },
    );
  };

  const doDelete = () => {
    setVideo(null);
  };

  return (
    <View style={styles.container}>
      {video === null ? (
        <RNCamera
          style={styles.preview}
          flashMode={flashMode}
          type={cameraMode}
          useNativeZoom={true}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={styles.previewContainer}>
                <View style={{ padding: 10 }}>
                  <Icon
                    onPress={() => navigation.goBack()}
                    source={'boton_volver_atras'}
                  />
                </View>
                <View style={styles.actionsBar}>
                  <View style={styles.actionsBarBottom}>
                    {images.length > 0 ? (
                      <Text style={styles.imagesCounter}>
                        {images.length} / {maxImages}
                      </Text>
                    ) : isRecording ? (
                      <Text style={styles.imagesCounter}>
                        {twoDigits(0)}:{twoDigits(timeCounter)}
                      </Text>
                    ) : (
                          <TouchableOpacity
                            onPress={() => recordVideo(camera)}
                            style={styles.takeVideo}>
                            <Image
                              style={styles.boton_takeVideo}
                              source={require('../../../assets/temporizador_15_seg.png')}
                            />
                          </TouchableOpacity>
                        )}
                    {/* <TouchableOpacity
                      
                      style={styles.editPicture}
                      disabled={!canPublish()}> */}
                    <Icon
                      onPress={() =>
                        canPublish() ?
                          navigation.navigate('PublishPublication', {
                            images,
                            setImages,
                            video,
                            setVideo,
                            navigation,
                          })
                          :
                          null
                      }
                      showSecondIcon={!canPublish()}
                      source={'done_all'}
                      secondIcon={'done'}
                      color={
                        canPublish() ? StylesConfiguration.color : 'grey'
                      }
                      size={iconSize}
                      style={styles.action}
                    />
                    {/* </TouchableOpacity> */}
                  </View>
                  <View style={styles.actionsBarTop}>
                    <View style={styles.imagesContainer}>
                      {images.map((image, i) => (
                        <TouchableOpacity
                          style={styles.miniImage}
                          onPress={() =>
                            navigation.navigate('ViewNewImage', {
                              image: image,
                              images: images,
                              setImages: setImages,
                              navigation: navigation,
                            })
                          }
                          key={i}>
                          <Image
                            style={styles.miniImage}
                            source={{ uri: image.uri }}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                    <View style={styles.cameraControls}>
                      <GetSwitchCameraIcon />
                      <GetFlashIcon />
                    </View>
                  </View>
                  {isRecording ? (
                    <TouchableOpacity
                      onPress={() => stopRecording(camera)}
                      style={styles.takePicture}>
                      <Image
                        style={styles.boton_takePicture}
                        source={require('../../../assets/temporizador_15_seg.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                      <TouchableOpacity
                        onPress={() => takePicture(camera)}
                        style={styles.takePicture}>
                        <Image
                          style={styles.boton_takePicture}
                          source={require('../../../assets/boton_ya.png')}
                        />
                      </TouchableOpacity>
                    )}
                </View>
              </View>
            );
          }}
        </RNCamera>
      ) : (
          <View style={styles.container}>
            <Video
              video={{ uri: video.uri }}
              style={styles.backgroundVideo}
              autoplay={true}
              defaultMuted={true}
              loop={true}
            />
            <View style={styles.actionsContainer}>
              <Icon
                onPress={tryEdit}
                source={'edit'}
                color="#FFFFFF"
                size={iconSize}
                style={styles.action}
              />
              <Icon
                onPress={tryDelete}
                source={'delete'}
                color="#FFFFFF"
                size={iconSize}
                style={styles.action}
              />
            </View>
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: 'black',
    // alignItems: 'stretch',
  },
  preview: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  actionsBar: {
    height: 160,
    flexDirection: 'column-reverse',
    // alignSelf: 'stretch',
    // alignItems: 'stretch',
  },
  actionsBarTop: {
    height: 86,
  },
  imagesContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cameraControls: {
    height: 41,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
  },
  cameraControl: {},
  miniImage: {
    height: 45,
    width: 45,
    marginHorizontal: 4,
  },
  actionsBarBottom: {
    height: 74,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  takeVideo: {
    // marginLeft: 5,
  },
  takePicture: {
    alignSelf: 'center',
    top: -150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  editPicture: {
    marginRight: 15,
  },
  boton_takeVideo: {
    width: 60,
    height: 60,
  },
  boton_takePicture: {
    width: 100,
    height: 100,
  },
  boton_editPicture: {
    width: 50,
    height: 50,
  },
  imagesCounter: {
    color: 'white',
  },
  backgroundVideo: {
    width: window.width,
    height: window.height - 130,
  },
  actionsContainer: {
    height: 50,
    bottom: -0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  action: {
    opacity: 1,
  },
});
