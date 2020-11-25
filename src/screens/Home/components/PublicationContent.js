import React from 'react';
import {Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Video from 'react-native-video-player';

export default function PublicationContent({files, showFullContent, style}) {
  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) => availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  if (files.length > 0) {
    return isImage(files[0].url_original) ? (
      <ScrollView horizontal={true} indicatorStyle="white">
        {files.map((file, i) => (
          <Image
            source={{uri: showFullContent ? file.url_original : file.url_half}}
            style={[style, i >= 1 ? {marginLeft: 10} : {}]}
            resizeMode="cover"
            fadeDuration={0}
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
