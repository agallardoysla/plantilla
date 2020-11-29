import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Alert, Image, StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ParsedText from 'react-native-parsed-text';
import ProgressiveImage from '../../../components/ProgressiveImage';
import posts_services from '../../../services/posts_services';
import CommentFormatter from '../../../utils/CommentFormatter';
import StylesConfiguration from '../../../utils/StylesConfiguration';

export default function MessageFormatter({message, navigation, style}) {
  const postPattern = /\[post:([^\]]+)\]/;   // [post:id]
  const [post, setPost] = useState();

  useEffect(() => {
    const matches = message.match(postPattern);
    if (matches) {
      posts_services.get(matches[1]).then((res) => {
        // //console.log('post a rederizar', res.data);
        setPost(res.data);
      });
    }
  }, []);

  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  const toView = (file) => {
    // //console.log(file, i);
    return isImage(file.url) ? (
      <ProgressiveImage
        source={{uri: file.url_half}}
        resizeMode="cover"
        style={styles.postImage}
        fadeDuration={0}
        thumbnailSource={{uri: file.url_small}}
      />
    ) : null;
  };

  const goToPost = () => {
    navigation.navigate('PostGroup', {
      screen: 'PublicationDetails',
      params: {
        post,
      },
    });
  };

  const renderPost = (matchingString, matches) => {
    return (
      <TouchableOpacity style={styles.postContainer} onPress={goToPost}>
        <View style={styles.postOwner}>
          <CommentFormatter
            style={styles.postOwner}
            comment={ post
              ? `(${post?.user_owner.display_name}:${post?.user_owner.user_id})`
              : ''}
            navigation={navigation}
          />
        </View>
        <View style={styles.postImageContainer}>{ post
          ? toView(post.files_with_urls[0])
          : <ActivityIndicator size="large" color={StylesConfiguration.color} />
        }</View>
        <View style={styles.postContent}>
          <CommentFormatter
            style={styles.postContent}
            comment={post 
              ? (post.text === '__post_text__' ? '' : post.text)
              : ''}
            navigation={navigation}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ParsedText
      style={[styles.text, style]}
      parse={[
        {
          pattern: postPattern,
          style: styles.post,
          renderText: renderPost,
        },
      ]}>
      {message}
    </ParsedText>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  post: {
    color: 'red',
  },
  postContainer: {
    width: 200,
    height: 200,
    backgroundColor: 'rgb(15, 15, 15)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    // padding: 5,
  },
  postOwner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  postContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  postImageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    height: 160,
    width: 120,
    paddingHorizontal: 40,
  },
});
