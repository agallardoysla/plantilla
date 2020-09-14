import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import StylesConfiguration from './StylesConfiguration';

export default function CommentFormatter({comment, style}) {

  const handlehashtagPress = (hashtag, matchIndex) => {
    Alert.alert(`${hashtag} ${matchIndex}`);
  };

  const handleUserMentionPress = (username, matchIndex) => {
    Alert.alert(`${username} ${matchIndex}`);
  };

  return (
    <ParsedText
      style={style}
      parse={[
        {pattern: /#(\w+)/, style: styles.hashTag, onPress: handlehashtagPress},
        {pattern: /@(\w+)/, style: styles.userMention, onPress: handleUserMentionPress},
      ]}>
      {comment}
    </ParsedText>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  hashTag: {
    fontStyle: 'italic',
    color: '#4f23fc',
  },
  userMention: {
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    // fontWeight: '300',
  },
});
