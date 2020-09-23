import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export default function ExampleApp() {
  
  const takePicture = async (camera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
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
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.takeVideo}>
                  <Image
                    style={styles.boton_takeVideo}
                    source={require('../../assets/temporizador_15_seg.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.editPicture}>
                  <Image
                    style={styles.boton_editPicture}
                    source={require('../../assets/pincel_blanco.png')}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.takePicture}>
                <Image
                  style={styles.boton_takePicture}
                  source={require('../../assets/boton_ya.png')}
                />
              </TouchableOpacity>
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
    height: 110,
    flexDirection: "column-reverse",
    alignSelf: 'stretch',
    alignItems: 'stretch',
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
    top: -64,
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
});