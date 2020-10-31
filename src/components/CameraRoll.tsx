import { PermissionsAndroid, Platform } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

export const hasAndroidPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

interface getGalleryProps {
  quantity: number;
  assetType?: 'Photos' | 'Video';
}

export const getGallery = async ({ quantity = 20, assetType = 'All' }: getGalleryProps) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }
  return CameraRoll.getPhotos({
    first: quantity,
    assetType,
  })
    .then((r) => {
      const gallery = Array.from(r.edges, asset => {
        const image = asset.node.image;
        const ext = Platform.OS === 'ios' ? image.filename.split('.')[1].toLowerCase() : image.uri.split('.')[1].toLowerCase();
        if (image.uri.startsWith('ph://')) {
          const appleId = image.uri.substring(5, 41);
          image.uri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
        }
        return {
          uri: image.uri,
          ext
        }
      });
      const hasMore = r.page_info.has_next_page;
      return { gallery, hasMore };
    })
    .catch((err) => {
      console.log('ERROR', err);
      return { gallery: [], hasMore: false, error: err };
    });
}