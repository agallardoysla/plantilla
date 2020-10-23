import CameraRoll from '@react-native-community/cameraroll';
import React, {useEffect, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Icon from '../../components/Icon';
import StylesConfiguration from '../../utils/StylesConfiguration';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import FormButton from '../../components/FormButton';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Gallery({
  maxImages,
  images,
  setImages,
  navigation,
  canPublish,
  assetType,
  setAssetType,
}) {
  const [assetsGallery, setAssetsGallery] = useState([]);
  const numColumns = 3;
  const pageSize = 12;
  const [endCursor, setEndCursor] = useState('0');
  const [hasNextPage, setHasNextPage] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

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
      loadAssets();
    };
    if (Platform.OS === 'ios') {
      loadAssets();
    } else {
      init();
    }
  }, []);

  const loadAssets = () => {
    loadAssetsParams(hasNextPage, assetType, endCursor, assetsGallery);
  };

  const loadAssetsParams = (
    _hasNextPage,
    _assetType,
    _endCursor,
    assetsLoaded,
  ) => {
    console.log();
    if (_hasNextPage) {
      CameraRoll.getPhotos({
        first: pageSize,
        after: _endCursor,
        assetType: _assetType,
      }).then((res) => {
        let assetsPaginated = [];
        // Se paginan los post de acuerdo a la cantidad de columnas
        res.edges.forEach((p, i) => {
          // si se llega a (i % numColumns === 0) se agrega una nueva pagina
          if (i % numColumns === 0) {
            assetsPaginated.push([]);
          }
          // siempre se agregan los posts en la ultima fila que se agrego
          assetsPaginated[assetsPaginated.length - 1].push(p.node.image.uri);
        });
        // setAssetsGallery([...assetsGallery, ...assetsPaginated]);
        setAssetsGallery([...assetsLoaded, ...assetsPaginated]);
        console.log('end:', res.page_info.end_cursor);
        setEndCursor(res.page_info.end_cursor);
        setHasNextPage(res.page_info.has_next_page);
        // setImages(res.edges.slice(0,5).map(edge => edge.node.image.uri));
      });
    }
  };

  const selectAsset = (asset) => {
    if (assetType === 'Photos') {
      if (!assetIsSelected(asset)) {
        if (images.length < maxImages) {
          setImages([...images, asset]);
          setVideo('');
        }
      } else {
        setImages(images.filter((i) => i !== asset));
      }
    }
    if (assetType === 'Videos') {
      if (!assetIsSelected(asset)) {
        setVideo(asset);
        setImages([]);
      } else {
        setVideo('');
      }
    }
  };

  const assetIsSelected = (asset) => {
    if (assetType === 'Photos') {
      return images.includes(asset);
    }
    if (assetType === 'Videos') {
      return asset === video;
    }
  };

  const changeTo = (newAssetType) => {
    setShowMenu(false);
    setHasNextPage(true);
    setAssetType(newAssetType);
    setEndCursor('0');
    setAssetsGallery([]);
    loadAssetsParams(true, newAssetType, '0', []);
  };

  const iconSize = 32;

  return (
    <View style={styles.container}>
      <View style={styles.actionsBarTop}>
        {/* <Menu opened={showMenu} onBackdropPress={() => setShowMenu(false)}>
          <MenuTrigger
            text={assetType === 'Photos' ? 'Fotos' : 'Videos'}
            customStyles={triggerStyles}
            onPress={() => setShowMenu(true)}
          />
          <MenuOptions customStyles={menuOption}>
            <MenuOption onSelect={() => changeTo('Photos')} text="Fotos" />
            <MenuOption onSelect={() => changeTo('Videos')} text="Videos" />
          </MenuOptions>
        </Menu> */}
      </View>
      <View style={styles.gallery}>
        <FlatList
          data={assetsGallery}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              {item.map((asset, i) => (
                <View
                  style={[
                    styles.item,
                    assetIsSelected(asset) ? styles.imageSelected : {},
                  ]}
                  key={i}>
                  <TouchableWithoutFeedback
                    onPress={() => selectAsset(asset)}
                    style={styles.itemImageContainer}>
                    <Image source={{uri: asset}} style={styles.itemImage} />
                  </TouchableWithoutFeedback>
                </View>
              ))}
            </View>
          )}
          keyExtractor={(item, i) => i.toString()}
          onEndReachedThreshold={0.9}
          onEndReached={(info) => loadAssets()}
          bouncesZoom={true}
        />
      </View>
      <View style={styles.actionsBarBottom}>
        {video === '' ? (
          <Text style={styles.imagesCounter}>
            {images.length} / {maxImages}
          </Text>
        ) : null}
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
            // TODO: Cambiar el icono por el similar al done-all y el done.
            showSecondIcon={!canPublish()}
            source={'done_all'}
            secondIcon={'done'}
            color={canPublish() ? StylesConfiguration.color : 'grey'}
            size={iconSize}
            style={styles.action}
          />
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 120,
  },
  item: {
    flex: 1,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  itemImageContainer: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  itemImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    marginHorizontal: 1.5,
    marginVertical: 1.5,
  },
  imageSelected: {
    transform: [{scaleX: 0.9}, {scaleY: 0.9}],
    borderColor: StylesConfiguration.color,
    borderWidth: 0.5,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionsBarTop: {
    height: 50,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    backgroundColor: 'black',
  },
  menu: {
    marginTop: 10,
    padding: 5,
  },
  menuText: {},
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
    alignSelf: 'stretch',
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

const triggerStyles = {
  triggerText: {
    color: 'white',
    alignSelf: 'flex-start',
  },
  triggerWrapper: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: StylesConfiguration.color,
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
    width: 150,
  },
};

const menuOption = {
  optionsContainer: {
    backgroundColor: 'black',
    padding: 5,
    borderColor: StylesConfiguration.color,
    borderWidth: 1,
    width: 150,
  },
  optionText: {
    color: 'white',
  },
};
