import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../navigation/AuthProvider';
import comments_services from '../services/comments_services';
import CommentFormatter from './CommentFormatter';

export default function CommentInput({
  placeholder,
  post,
  comments,
  setSavingComment,
  callback,
  style,
}) {
  const [newComment, setNewComment] = useState('');
  const [showSugestions, setShowSugestions] = useState(false);
  const [sugestionsInput, setSugestionsInput] = useState('');
  const {user} = useContext(AuthContext);
  
  const getMentionsSugestions = () => {
    var res = [];
    res.push(post.user_owner);
    res = res.concat(comments.map(c => c.user_owner));
    // console.log(res);
    return res.filter(
      (s) =>
        s.display_name.slice(0, sugestionsInput.length) === sugestionsInput,
    );
  };

  const saveComment = async () => {
    setSavingComment(true);
    const comment = {
      post: post.id,
      text: newComment,
      user_owner: user,
    };
    await comments_services.create(comment);
    callback(comment);
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
        <View style={styles.sugestions}>
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
    position: 'absolute',
    bottom: 70,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'white',
    marginLeft: 30,
    backgroundColor: 'black',
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
