import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import { withTheme } from 'react-native-elements';
import ParsedText from 'react-native-parsed-text';
import StylesConfiguration from './StylesConfiguration';

export default function CommentFormatter({comment, isInput, setShowSugestions, setSugestionsInput, style}) {
  const postOwnerPattern = /\[(\w+)\]/;
  const commentOwnerPattern = /\{(\w+)\}/;
  const hashtagPattern = /#(\w+)/;
  const initUserMentionPattern = /@/;
  const userMentionPattern = /@(\w+)/;

  const handlehashtagPress = (hashtag, matchIndex) => {
    Alert.alert(`${hashtag} ${matchIndex}`);
  };

  const handleUserPress = (username, matchIndex) => {
    Alert.alert(`${username} ${matchIndex}`);
  };

  const renderInitUserMention = (matchingString) => {
    setShowSugestions(false);
    return matchingString;
  };

  const renderUserMention = (matchingString, matches) => {
    // console.log(matches);
    if (isInput && comment.slice(-matches[1].length) === matches[1]) {
      setShowSugestions(true);
      setSugestionsInput(matches[1]);
    }
    return matchingString;
  };

  const renderPostOwner = (matchingString, matches) => {
    return matches[1];
  };

  const renderCommentOwner = (matchingString, matches) => {
    return '@' + matches[1];
  };

  return (
    <ParsedText
      style={[styles.text, style]}
      parse={[
        {
          pattern: hashtagPattern,
          style: styles.hashTag,
          onPress: handlehashtagPress,
        },
        {
          pattern: userMentionPattern,
          style: styles.userMention,
          onPress: handleUserPress,
          renderText: renderUserMention,
        },
        {
          pattern: postOwnerPattern,
          style: styles.postOwner,
          onPress: handleUserPress,
          renderText: renderPostOwner,
        },
        {
          pattern: commentOwnerPattern,
          style: styles.postOwner,
          onPress: handleUserPress,
          renderText: renderCommentOwner,
        },
        {
          pattern: initUserMentionPattern,
          renderText: renderInitUserMention,
        },
      ]}>
      {comment}
    </ParsedText>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  hashTag: {
    // fontStyle: 'italic',
    color: '#8A2BE2',
  },
  postOwner: {
    color: StylesConfiguration.color,
    fontWeight: 'bold',
  },
  userMention: {
    color: StylesConfiguration.color,
  },
  sugestions: {
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
