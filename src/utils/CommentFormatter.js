import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import { withTheme } from 'react-native-elements';
import ParsedText from 'react-native-parsed-text';
import StylesConfiguration from './StylesConfiguration';

export default function CommentFormatter({comment, isInput, setShowSugestions, setSugestionsInput}) {
  const hashtagPattern = /#(\w+)/;
  const initUserMentionPattern = /@/;
  const userMentionPattern = /@(\w+)/;

  const handlehashtagPress = (hashtag, matchIndex) => {
    Alert.alert(`${hashtag} ${matchIndex}`);
  };

  const handleUserMentionPress = (username, matchIndex) => {
    Alert.alert(`${username} ${matchIndex}`);
  };

  const renderInitUserMention = (matchingString) => {
    setShowSugestions(false);
    return matchingString;
  };

  const renderUserMention = (matchingString, matches) => {
    // console.log(matches);
    if (isInput && comment.slice(-matches[1].length) == matches[1]) {
      setShowSugestions(true);
      setSugestionsInput(matches[1]);
    }
    return matchingString;
  };

  return (
    <ParsedText
      style={styles.text}
      parse={[
        {
          pattern: hashtagPattern,
          style: styles.hashTag,
          onPress: handlehashtagPress,
        },
        {
          pattern: userMentionPattern,
          style: styles.userMention,
          onPress: handleUserMentionPress,
          renderText: renderUserMention,
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
  userMention: {
    color: StylesConfiguration.color,
  },
  sugestions: {
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
