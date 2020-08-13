import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  //TouchableOpacity,
  //Image,
  //alert,
  Button,
} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function HomeScreen() {
  const {user, logout} = useContext(AuthContext);
  //const [resourcePath, setResourcePath] = useState({});
  const [videoSource, setVideoSource] = useState('');

  /*const selectFile = () => {
    var options = {
      title: 'Seleccione una imagen',
      //mediaType: 'video',
      //durationLimit: '15',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        setResourcePath(source);
      }
    });
  };*/

  const selectVideo = () => {
    const options2 = {
      title: 'Select video',
      mediaType: 'video',
      //durationLimit: 15,
      path: 'video',
      quality: 1,
    };

    ImagePicker.showImagePicker(options2, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        setVideoSource(source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome user {user.uid}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />

      {/*<Image
        source={{
          uri: 'data:image/jpeg;base64,' + resourcePath.data,
        }}
        style={{width: 100, height: 100}}
      />
      <Image
        source={{uri: resourcePath.uri}}
        style={{width: 200, height: 200}}
      />
      <Text style={{alignItems: 'center'}}>{resourcePath.uri}</Text>

      <TouchableOpacity onPress={selectFile} style={styles.button}>
        <Text>Select File</Text>
      </TouchableOpacity>*/}

      {/*<Video
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
      />*/}

      <Button title="Select video" onPress={selectVideo} />
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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
