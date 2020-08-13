import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  alert,
} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import ImagePicker from 'react-native-image-picker';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function HomeScreen() {
  const {user, logout} = useContext(AuthContext);
  const [resourcePath, setResourcePath] = useState({});

  const selectFile = () => {
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome user {user.uid}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />

      <Image
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
      </TouchableOpacity>
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
});
