import React from 'react';
import {Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Video from 'react-native-video-player';
import ProgressiveImage from '../../../components/ProgressiveImage';

export default function PublicationContent({files, style}) {
  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) => availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  if (files.length > 0) {
    return isImage(files[0].url_original) ? (
      <ScrollView horizontal={true} indicatorStyle="white">
        {files.map((file, i) => (
          <ProgressiveImage
            source={{uri:file.url_original}}
            style={[style, i >= 1 ? {marginLeft: 10} : {}]}
            resizeMode="cover"
            thumbnailSource={{uri:file.url_small}}
            key={i}
          />
        ))}
      </ScrollView>
    ) : (
      <Video
        video={{uri: files[0].url_original}}
        style={style}
        autoplay={true}
        defaultMuted={true}
        loop={true}
      />
    );
  } else {
    return null;
  }
}
