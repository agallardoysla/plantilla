import React from 'react';
import {
  Image,
} from 'react-native';
import Video from 'react-native-video-player';
import { useSelector } from 'react-redux';
import { getFile } from '../../../reducers/files';

export default function PublicationContent({fileId, showFullContent, style}) {
  const file = useSelector(getFile(fileId));

  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  return isImage(file.url_original) ? (
    <Image
      source={{uri: showFullContent ? file.url_half : file.url_half}}
      style={style}
      resizeMode="contain"
      fadeDuration={0}
    />
  ) : (
    <Video
      video={{ uri: file.url_original }}
      style={style}
      autoplay={true}
      defaultMuted={true}
      loop={true}
    />
  );
};
