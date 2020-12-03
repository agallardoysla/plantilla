import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Video from 'react-native-video-player';
import ProgressiveImage from '../../../components/ProgressiveImage';
import PublicationActions from './PublicationActions';
import Slick from 'react-native-slick';
import {Text, View} from 'react-native';
export default function PublicationContent({
  files,
  style,
  navigation,
  post,
  isFeed,
}) {
  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  if (files?.length > 0) {
    return (
      <Slick
        // showsButtons
        style={{height: 400}}
        loop={false}
        dotColor={'#50555C'}
        activeDotColor={'#E9FC64'}>
        {files.map((file, i) => {
          return isImage(file.url_original) ? (
            <ProgressiveImage
              source={{uri: file.url_original}}
              style={[style, i >= 1 ? {marginLeft: 10} : {}]}
              resizeMode="cover"
              thumbnailSource={{uri: file.url_small}}
              key={i}
              onPress={() =>
                isFeed && post && PublicationActions.goToPost(post, navigation)
              }
            />
          ) : (
            <Video
              video={{uri: file.url_original}}
              style={style}
              autoplay={true}
              defaultMuted={false}
              loop={false}
              pauseOnPress
              fullScreenOnLongPress
              customStyles={{
                seekBarKnob: {
                  backgroundColor: 'yellow',
                },
                seekBarProgress: {
                  backgroundColor: 'yellow',
                },
              }}
            />
          );
        })}
      </Slick>
    );
  } else {
    return null;
  }
}
