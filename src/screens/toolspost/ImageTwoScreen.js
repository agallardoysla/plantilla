import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function ImageTwoSreen() {
  const [resourcePath, setResourcePath] = useState({});

  //Imagen de corte
  const selectFile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image.path);
      setResourcePath(image.path);
    });
  };

  //Multiples imágenes. Solo en iOS se puede definir un minimo y un maximo de archivos minFiles (ios only)
  const selectMultipleFile = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      console.log(images);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      //setResourcePath(image.path);
    });
  };

  const mostrarImagen = () => {
    if (Object.keys(resourcePath).length !== 0) {
      return (
        <>
          <Image
            source={{uri: resourcePath}}
            style={{width: 200, height: 200}}
          />
          <Text style={{alignItems: 'center'}}>{resourcePath}</Text>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>React Native Image Crop Picker (IMAGEN)</Text>

      {/*<Image
        source={{
          uri: 'data:image/jpeg;base64,' + resourcePath.data,
        }}
        style={{width: 100, height: 100}}
    />*/}
      {mostrarImagen()}
      <View style={styles.button}>
        <Button title="Seleccionar imagen con corte" onPress={selectFile} />
      </View>
      <View style={styles.button}>
        <Button
          title="Seleccionar Multiples archivos"
          onPress={selectMultipleFile}
        />
      </View>
      <View style={styles.button}>
        <Button title="Abrir la Cámara" onPress={openCamera} />
      </View>
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
  button: {
    marginBottom: 15,
  },
});
