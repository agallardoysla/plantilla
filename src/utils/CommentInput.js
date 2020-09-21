import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../navigation/AuthProvider';
import comments_services from '../services/comments_services';
import CommentFormatter from './CommentFormatter';

export default function CommentInput({
  placeholder,
  post,
  comment,
  comments,
  setSavingComment,
  callback,
  style,
  initialText,
  isEdition,
}) {
  const [newComment, setNewComment] = useState(initialText);
  const [showSugestions, setShowSugestions] = useState(false);
  const [sugestionsInput, setSugestionsInput] = useState('');
  const {user} = useContext(AuthContext);
  
  const getMentionsSugestions = () => {
    // console.log(post, comment, comments);
    var res = [];
    if (post) {
      res.push(post.user_owner);
    }
    if (comment) {
      res.push(comment.user_owner);
    }
    if (comments) {
      res = res.concat(comments.map(c => c.user_owner));
    }
    res = res.filter(
      (s) =>
        s.display_name.slice(0, sugestionsInput.length).toLowerCase() === sugestionsInput.toLowerCase(),
    );
    // console.log(res);
    return res;
  };

  const saveComment = async () => {
    setSavingComment(true);
    const _comment = {
      post: post.id,
      text: newComment,
      user_owner: user,
      comments: [],
    };
    if (comment && !isEdition) _comment.original_comment = comment.id;

    if (isEdition) {
      const res = await comments_services.edit(comment.id, _comment);
      console.log(res.data);
    } else {
      const res = await comments_services.create(_comment);
      console.log(res.data);
      _comment.id = res.data.id;
    }
    setNewComment('');
    callback(_comment);
  };

  const selectSugestion = (sugestion) => {
    setNewComment(
      newComment
        .slice(0, -sugestionsInput.length)
        .concat(sugestion.display_name)
        .concat(' '),
    );
    setShowSugestions(false);
  };

  return (
    <>
      {showSugestions ? (
        <View
          style={[
            styles.sugestions,
            comment === undefined
              ? styles.sugestionsPositionComment
              : styles.sugestionsPositionAnswer,
          ]}>
          {getMentionsSugestions().map((sugestion, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => selectSugestion(sugestion)}
              activeOpacity={0.4}
              style={styles.sugestionContainer}>
              <Image
                source={require('../assets/foto.png')}
                style={styles.icon_profile}
              />
              <Text style={styles.sugestion}>@{sugestion.display_name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
      <TextInput
        style={[styles.newComment, style]}
        onChangeText={setNewComment}
        onSubmitEditing={saveComment}
        placeholder={placeholder}
        placeholderTextColor={'white'}>
        <CommentFormatter
          comment={newComment}
          isInput={true}
          post={post}
          comments={comments}
          setShowSugestions={setShowSugestions}
          setSugestionsInput={setSugestionsInput}
        />
      </TextInput>
    </>
  );
}

const styles = StyleSheet.create({
  sugestions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'white',
    backgroundColor: 'black',
    position: 'absolute',
  },
  sugestionsPositionComment: {
    bottom: 70,
    marginLeft: 30,
  },
  sugestionsPositionAnswer: {
    bottom: 50,
    marginLeft: 70,
  },
  sugestionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'black',
    paddingHorizontal: 10,
  },
  sugestion: {
    color: 'white',
  },
  icon_profile: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 400 / 2,
  },
  newComment: {
    color: 'white',
    // fontFamily: StylesConfiguration.fontFamily,
    fontSize: 12,
    backgroundColor: '#50555C',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
  },
});
