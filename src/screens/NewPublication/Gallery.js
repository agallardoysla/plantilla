import CameraRoll from '@react-native-community/cameraroll';
import React, { useEffect, useState } from 'react';
import { Image, PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import StylesConfiguration from '../../utils/StylesConfiguration';

export default function Gallery({
  maxImages,
  images,
  setImages,
  navigation,
  video,
  setVideo,
  canPublish,
}) {
  const [imagesGallery, setImagesGallery] = useState([]);
  const numColumns = 3;
  const pageSize = 12;
  const [startCursor, setStartCursor] = useState(0);
  const [endCursor, setEndCursor] = useState("0");
  const [hasNextPage, setHasNextPage] = useState(true);

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
    if (hasNextPage) {
      CameraRoll.getPhotos({
        first: pageSize,
        after: endCursor,
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
        setImagesGallery([...imagesGallery, ...postsPaginated]);
        console.log("end:", res.page_info.end_cursor);
        setEndCursor(res.page_info.end_cursor);
        setHasNextPage(res.page_info.has_next_page);
        setImages(res.edges.slice(0,5).map(edge => edge.node.image.uri));
      });
    }
  };

  const iconSize = 32;

  return (
    <View style={styles.container}>
      <View style={styles.gallery}>
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
          onEndReachedThreshold={0.9}
          onEndReached={(info) => loadPhotos()}
          bouncesZoom={true}
        />
      </View>
      <View style={styles.actionsBar}>
        <View style={styles.actionsBarBottom}>
          <Text style={styles.imagesCounter}>
            {images.length} / {maxImages}
          </Text>
          <View style={styles.imagesContainer}>
            {images.map((image, i) => (
              <TouchableOpacity
                style={styles.miniImage}
                onPress={() =>
                  navigation.navigate('ViewNewImage', {
                    uri: image,
                    images: images,
                    setImages: setImages,
                    navigation: navigation,
                  })
                }
                key={i}>
                <Image style={styles.miniImage} source={{uri: image}} />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PublishPublication', {
                images: images,
                setImages: setImages,
                video: video,
                setVideo: setVideo,
                navigation: navigation,
              })
            }
            style={styles.editPicture}
            disabled={!canPublish()}>
            <Icon
              name={canPublish() ? 'done-all' : 'done'}
              color={canPublish() ? StylesConfiguration.color : 'grey'}
              size={iconSize}
              style={styles.action}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  gallery: {
    flex: 1,
    justifyContent: 'center',
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionsBar: {
    height: 74,
    flexDirection: "column-reverse",
    alignSelf: 'stretch',
    alignItems: 'stretch',
    backgroundColor: 'blue',
  },
  imagesContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  miniImage: {
    height: 45,
    width: 45,
    marginHorizontal: 2,
  },
  actionsBarBottom: {
    height: 74,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  imagesCounter: {
    color: 'white',
  },
});
