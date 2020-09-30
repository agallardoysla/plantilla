import React from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import {Icon} from 'react-native-elements';

const height = Dimensions.get('window').height;
const iconSize = 40;

export default function ViewNewImage({route}) {
  const {uri, images, setImages, navigation} = route.params;

  const tryEdit = () => {
    Alert.alert('Editar imagen');
  };

  const tryDelete = () => {
    Alert.alert(
      '¿Quitar imagen de la publicación?',
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
      {cancelable: false},
    );
  };

  const doDelete = () => {
    setImages(images.filter((image) => image !== uri));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri}} />
      <View style={styles.actionsContainer}>
        <Icon
          onPress={tryEdit}
          name={'edit'}
          color="#FFFFFF"
          size={iconSize}
          style={styles.action}
        />
        <Icon
          onPress={tryDelete}
          name={'delete'}
          color="#FFFFFF"
          size={iconSize}
          style={styles.action}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  image: {
    height,
  },
  actionsContainer: {
    height: 50,
    bottom: 123,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  action: {
    opacity: 1,
  },
});
