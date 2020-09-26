import React, { PureComponent, useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {Icon} from 'react-native-elements';
import { FeedContext } from '../../navigation/FeedContext';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Esperando permisos...</Text>
  </View>
);

export default function TakePicture({
  navigation,
  maxDuration,
  maxImages,
  images,
  setImages,
  video,
  setVideo,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [timeCounter, setTimeCounter] = useState(maxDuration);
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.on);
  const [flash, setFlash] = useState(0);
  const [cameraMode, setCameraMode] = useState(RNCamera.Constants.Type.back);
  const [_camera, setCamera] = useState(0);
  
  const takePicture = async (camera) => {
    if (images.length < maxImages) {
      const options = { base64: true };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
      setImages([...images, data.uri]);
    }
  };

  const recordVideo = async (camera) => {
    setIsRecording(true);
    let localCounter = timeCounter;
    const timeCounterInterval = setInterval(() => {
      setTimeCounter(--localCounter);
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
  }; 

  const stopRecording = async (camera) => {
    camera.stopRecording();
  }

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
    const flashIcons = ['flash-auto', 'flash-on', 'flash-off'];
    return (
      <Icon
        onPress={turnFlash}
        name={flashIcons[flash]}
        color="#FFFFFF"
        size={iconSize}
        style={styles.cameraControl}
      />
    );
  };

  const GetSwitchCameraIcon = () => {
    const cameraIcons = ['camera-rear', 'camera-front'];
    return (
      <Icon
        onPress={flipCamera}
        name={cameraIcons[_camera]}
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
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
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
            <View style={styles.actionsBar}>
              <View style={styles.actionsBarBottom}>
                {images.length > 0 ? (
                  <Text style={styles.imagesCounter}>{images.length} / {maxImages}</Text>
                ) : (
                  isRecording ? (
                  <Text style={styles.imagesCounter}>0:{timeCounter}</Text>
                  ) :(
                    <TouchableOpacity
                      onPress={() => recordVideo(camera)}
                      style={styles.takeVideo}>
                      <Image
                        style={styles.boton_takeVideo}
                        source={require('../../assets/temporizador_15_seg.png')}
                      />
                    </TouchableOpacity>
                  )
                )}
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.editPicture}>
                  <Image
                    style={styles.boton_editPicture}
                    source={require('../../assets/pincel_blanco.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.actionsBarTop}>
                <View style={styles.imagesContainer}>
                  {images.map((image, i) => (
                    <TouchableOpacity
                      style={styles.miniImage}
                      onPress={() => navigation.navigate('ViewNewImage', {uri: image})}
                      key={i}
                    >
                      <Image style={styles.miniImage} source={{uri: image}} />
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
                    source={require('../../assets/temporizador_15_seg.png')}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.takePicture}>
                  <Image
                    style={styles.boton_takePicture}
                    source={require('../../assets/boton_ya.png')}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'stretch',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionsBar: {
    height: 160,
    flexDirection: "column-reverse",
    alignSelf: 'stretch',
    alignItems: 'stretch',
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
  cameraControl: {
  },
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
  },
  takeVideo: {
    marginLeft: 5,
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
});
