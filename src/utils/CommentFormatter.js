import React, { useEffect } from 'react';
import {Alert, StyleSheet} from 'react-native';
// import { withTheme } from 'react-native-elements';
import ParsedText from 'react-native-parsed-text';
import StylesConfiguration from './StylesConfiguration';


export default function CommentFormatter({comment, isInput, setShowSugestions, setSugestionsInput, style, navigation}) {
  const hashtagPattern = /#(\w+)/;                      // #nombre
  const postOwnerPattern = /\(([^:]+):([^)]+)\)/i;      // (nombre:id)
  const commentOwnerPattern = /\{([^:]+):([^}]+)\}/i;   // {nombre:id}
  const userMentionPattern = /\[([^:]+):([^\]]+)\]/i;   // [nombre:id]
  const initUserMentionPattern = /@(\w+)\b/g;           // @nombre

  useEffect(() => {
    if (isInput && comment.length > 0) {
      // console.log(comment);
      const matches = comment.match(initUserMentionPattern);
      setShowSugestions(!!matches);
      if (matches) {
        const lastMatch = matches[matches.length - 1];
        // console.log("input matches: ", matches);
        const showSugestions = comment.slice(-lastMatch.length) === lastMatch;
        if (showSugestions) {
          setSugestionsInput(lastMatch.slice(1));
        }
        setShowSugestions(showSugestions);
      }
    }
  }, [comment, initUserMentionPattern, isInput, setShowSugestions, setSugestionsInput]);

  const handlehashtagPress = (hashtag, matchIndex) => {
    Alert.alert(`${hashtag} ${matchIndex}`);
  };

  const handleUserPress = (code, matchIndex) => {
    const test = /(\(|\{|\[)([^:]+):([^\]]+)(\)|\}|\])/i;
    const matches = code.match(test);
    console.log(matches);
    navigation.navigate('OtherProfileGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: matches[3],
      },
    });
  };

  const renderPostOwner = (matchingString, matches) => {
    return matches[1];
  };

  const renderCommentOwner = (matchingString, matches) => {
    return '@' + matches[1];
  };

  const renderUserMention = (matchingString, matches) => {
    // console.log("renderUserMention", matches, matchingString);
    // return matchingString;
    return '@' + matches[1];
  };

  const renderInitUserMention = (matchingString, matches) => {
    return matchingString;
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
          pattern: userMentionPattern,
          style: styles.userMention,
          onPress: handleUserPress,
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
  postOwner: {
    color: StylesConfiguration.color,
    fontWeight: 'bold',
  },
  userMention: {
    color: StylesConfiguration.color,
  },
  
});
