import React, { useEffect, useState } from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ParsedText from 'react-native-parsed-text';
import posts_services from '../../services/posts_services';
import CommentFormatter from '../../utils/CommentFormatter';
import StylesConfiguration from '../../utils/StylesConfiguration';

export default function MessageFormatter({message, navigation, style}) {
  const postPattern = /\[post:([^\]]+)\]/;   // [post:id]
  const [post, setPost] = useState();

  useEffect(() => {
    const matches = message.match(postPattern);
    console.log(matches);
    if (matches) {
      posts_services.get(matches[1]).then((res) => {
        console.log('post a rederizar', res.data);
        setPost(res.data);
      });
    }
  }, []);

  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  const toView = (file) => {
    // console.log(file, i);
    return isImage(file.url) ? (
      <Image
        source={{uri: file.url}}
        resizeMode="cover"
        style={styles.postImage}
      />
    ) : null;
  };

  const renderPost = (matchingString, matches) => {
    return post ? (
      <TouchableOpacity
        style={styles.postContainer}
        onPress={() => navigation.navigate('PublicationDetails', {post})}>
        <View style={styles.postOwner}>
          <CommentFormatter
            style={styles.postOwner}
            comment={`(${post.user_owner.display_name}:${post.user_owner.user_id})`}
            navigation={navigation}
          />
        </View>
        <View style={styles.postImage}>{toView(post.files_with_urls[0])}</View>
        <View style={styles.postContent}>
          <CommentFormatter
            style={styles.postContent}
            comment={post.text === '__post_text__' ? '' : post.text}
            navigation={navigation}
          />
        </View>
      </TouchableOpacity>
    ) : null;
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
  postImage: {
    height: 160,
    width: 120,
    paddingHorizontal: 40,
  },
});
