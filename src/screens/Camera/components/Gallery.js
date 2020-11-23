import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Pressable,
  Dimensions,
} from 'react-native';
import Icon from '../../../components/Icon';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { getGallery } from '../../../components/CameraRoll';

const { width } = Dimensions.get('window');

export default function Gallery({
  maxImages,
  images,
  setImages,
  navigation,
  video,
  setVideo,
  canPublish,
  assetType,
  setAssetType,
  canGetVideo,
  callback,
  goBack
}) {
  const [type, setType] = useState(assetType);
  const [assetsGallery, setAssetsGallery] = useState([]);
  const [pageSize, setPagesize] = useState(30);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    assets(type, hasNextPage);
  }, []);

  const assets = async (_assetType, _hasNextPage) => {
    // //console.log('LLEGUE', hasNextPage);
    if (_hasNextPage) {
      const data = await getGallery({
        quantity: pageSize + 30,
        assetType: _assetType,
      });
      // //console.log('LENG', data.gallery.length);
      setPagesize(pageSize + 30);
      setAssetsGallery(data.gallery);
      setHasNextPage(data.hasMore);
    }
  };

  const selectAsset = (asset) => {
    if (type === 'Photos') {
      if (!assetIsSelected(asset)) {
        if (images.length < maxImages) {
          setImages([...images, asset]);
          setVideo(null);
        }
      } else {
        setImages(images.filter((i) => i !== asset));
      }
    }
    if (type === 'Videos') {
      if (!assetIsSelected(asset)) {
        setVideo(asset);
        setImages([]);
      } else {
        setVideo(null);
      }
    }
  };

  const assetIsSelected = (asset) => {
    if (type === 'Photos') {
      return images.includes(asset);
    }
    if (type === 'Videos') {
      //console.log('ASS', asset);
      //console.log('VID', video);
      return asset === video;
    }
  };

  const changeTo = async (newAssetType) => {
    setShowMenu(false);
    if (newAssetType !== type) {
      await setHasNextPage(true);
      await setType(newAssetType);
      await setPagesize(30);
      await setAssetsGallery([]);
      assets(newAssetType, true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionsBarTop}>
        <Icon
          onPress={() => goBack()}
          source={'boton_volver_atras'}
        />
        {canGetVideo ? (
          <Menu opened={showMenu} onBackdropPress={() => setShowMenu(false)}>
            <MenuTrigger
              text={type === 'Photos' ? 'Fotos' : 'Videos'}
              customStyles={triggerStyles}
              onPress={() => setShowMenu(true)}
            />
            <MenuOptions customStyles={menuOption}>
              <MenuOption onSelect={() => changeTo('Photos')} text="Fotos" />
              <MenuOption onSelect={() => changeTo('Videos')} text="Videos" />
            </MenuOptions>
          </Menu>
        ) : null}
      </View>
      <View style={styles.gallery}>
        <FlatList
          keyExtractor={(_, i) => String(i)}
          numColumns={3}
          initialNumToRender={15}
          data={assetsGallery}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                // //console.log(video)
                selectAsset(item);
              }}>
              <Image
                fadeDuration={0}
                style={
                  assetIsSelected(item)
                    ? styles.imageSelected
                    : styles.itemImage
                }
                source={{ uri: item.uri }}
              />
            </Pressable>
          )}
          onEndReachedThreshold={0.9}
          onEndReached={() => assets(type, hasNextPage)}
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
            <Pressable
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
              <Image style={styles.miniImage} source={{ uri: image.uri }} />
            </Pressable>
          ))}
        </View>
        <Icon
          onPress={() =>
            canPublish()
              ? callback({
                  images,
                  setImages,
                  video,
                  setVideo,
                  navigation,
                })
              : null
          }
          showSecondIcon={!canPublish()}
          source={'done_all'}
          secondIcon={'done'}
          color={canPublish() ? StylesConfiguration.color : 'grey'}
          size={32}
          style={styles.action}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  gallery: {
    flex: 1,
    justifyContent: 'center',
  },
  itemImage: {
    width: width / 3,
    height: width / 3,
  },
  imageSelected: {
    borderColor: StylesConfiguration.color,
    borderWidth: 3,
    width: width / 3,
    height: width / 3,
    opacity: 0.7,
  },
  actionsBarTop: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    marginHorizontal: 10,
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
