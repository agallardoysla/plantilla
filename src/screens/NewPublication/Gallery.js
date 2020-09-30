import CameraRoll from '@react-native-community/cameraroll';
import React, { useEffect, useState } from 'react';
import { Image, PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export default function Gallery({maxImages, images, setImages}) {
  const [imagesGallery, setImagesGallery] = useState([]);
  const numColumns = 3;
  const pageSize = 24;
  const [page, setPage] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const init = async () => {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      }
      loadPhotos();
    }
    init();
  }, [images]);

  const loadPhotos = () => {
    CameraRoll.getPhotos({
      first: pageSize * page,
      assetType: 'Photos',
    }).then(res => {
      let postsPaginated = [];
      // Se paginan los post de acuerdo a la cantidad de columnas
      res.edges.forEach((p, i) => {
        // si se llega a (i % numColumns === 0) se agrega una nueva pagina
        if (i % numColumns === 0) {
          postsPaginated.push([]);
        }
        // siempre se agregan los posts en la ultima fila que se agrego
        postsPaginated[postsPaginated.length - 1].push(p);
      });
      setImagesGallery(postsPaginated);
      // setImages(res.edges.slice(0,3).map(edge => edge.node.image.uri));
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={imagesGallery}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            {item.map((image, i) => (
              // <TouchableOpacity
              //   onPress={() => {}}
              //   style={styles.itemImage}
              // >
                <Image
                  source={{uri: image.node.image.uri}}
                  style={styles.itemImage}
                  key={i}
                />
              // </TouchableOpacity>
            ))}
          </View>
        )}
        keyExtractor={(item, i) => i.toString()}
      />
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
  itemContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 120,
  },
  itemImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    marginHorizontal: 1.5,
    marginVertical: 1.5,
  },  
});
