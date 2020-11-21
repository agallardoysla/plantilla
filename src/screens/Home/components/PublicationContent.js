import React from 'react';
import {Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Video from 'react-native-video-player';
import {useSelector} from 'react-redux';
import {getFile} from '../../../reducers/files';

export default function PublicationContent({
  fileId,
  showFullContent,
  style,
  onPress,
}) {
  const file = useSelector(getFile(fileId));

  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);
    console.log('file', file)
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      {isImage(file.url_original) ? (
        <Image
          source={{uri: file.url_half}}
          style={style}
          resizeMode="cover"
          fadeDuration={0}
        />
      ) : (
        <Video
          video={{uri: file.url_original}}
          style={style}
          autoplay={true}
          defaultMuted={true}
          loop={true}
        />
      )}
    </TouchableWithoutFeedback>
  );
}
