import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import { addComments, createComment } from '../reducers/comments';
import {getLoggedUser} from '../reducers/loggedUser';
import { getFullUsers } from '../reducers/users';
import comments_services from '../services/comments_services';
import users_services from '../services/users_services';
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
  const user = useSelector(getLoggedUser);
  const users = useSelector(getFullUsers);
  const [sugestionsAsync, setSugestionsAsync] = useState([]);
  const maxSugestions = 5;
  const dispatch = useDispatch();

  useEffect(() => {
    let filteredSugestions = getFixedSugestions;
    filteredSugestions = filteredSugestions.filter((s) => {
      s.display_name.slice(0, sugestionsInput.length).toLowerCase() === sugestionsInput.toLowerCase();
    });
    getMentionsSugestionsAsync(filteredSugestions);
  }, [getFixedSugestions, getMentionsSugestionsAsync, sugestionsInput]);

  const getFixedSugestions = useMemo(() => {
    const res = [];
    if (post) {
      res.push(post.user_id);
    }
    if (comment) {
      res.push(comment.user_id);
    }
    if (comments) {
      comments.forEach((c) => {
        if (res.reduce((r, s) => r && c.user_id !== s, true)) {
          res.push(c.user_id);
        }
      });
    }
    return res.map((s) => users[s]);
  }, [comment, comments, post, users]);

  const getMentionsSugestions = () => {
    const filteredSugestions = getFixedSugestions.filter(
      sugestionsInput.length > 0
        ? (s) =>
            s.display_name.slice(0, sugestionsInput.length).toLowerCase() === sugestionsInput.toLowerCase()
        : [],
    );
    return filteredSugestions;
  };

  const getMentionsSugestionsAsync = useCallback(
    async (filteredSugestions) => {
      if (sugestionsInput.length > 0) {
        const context = await users_services.getContext({
          search: sugestionsInput.toLowerCase(),
          exclude: filteredSugestions.map(s => s.user_id),
          limit: maxSugestions - filteredSugestions.length,
        });
        // console.log(context.data);
        context.data = context.data.map(d => {
          return {
            user_id: d.id,
            ...d,
          };
        });
        setSugestionsAsync(
          sugestionsInput.length > 0
            ? context.data.filter(
                (s) =>
                  s.display_name
                    .slice(0, sugestionsInput.length)
                    .toLowerCase() === sugestionsInput.toLowerCase(),
              )
            : [],
        );
      }
    },
    [sugestionsInput],
  );

  const saveComment = async () => {
    setSavingComment(true);
    const _comment = {
      post: post.id,
      text: newComment,
      user_owner: user.id,
      comments: [],
    };
    if (comment && !isEdition) {
      _comment.original_comment = comment.id;
    }

    console.log('created', _comment);
    if (isEdition) {
      const res = await comments_services.edit(comment.id, _comment);
      console.log(res.data);
    } else {
      const res = await comments_services.create(_comment);
      let reduxComment;
      if (comment) {
        const commentId = res.data.comments.reverse()[0].id;
        console.log('id', commentId);
        reduxComment = createComment(commentId, newComment, post.id, user.id);
        reduxComment.original_comment_id = comment.id;
      } else {
        reduxComment = createComment(res.data.id, newComment, post.id, user.id);
      }
      console.log('new comment: ', reduxComment);
      dispatch(addComments([reduxComment]));
    }
    setNewComment('');
    callback();
  };

  const selectSugestion = (sugestion) => {
    setNewComment(
      newComment
        .slice(0, -(sugestionsInput.length + 2))
        .concat(`[${sugestion.display_name}:${sugestion.user_id}] `)
    );
    setShowSugestions(false);
  };

  const Mention = ({sugestion, key}) => (
    <TouchableOpacity
      key={key}
      onPress={() => selectSugestion(sugestion)}
      activeOpacity={0.4}
      style={styles.sugestionContainer}>
      <Image
        source={require('../assets/foto.png')}
        style={styles.icon_profile}
      />
      <Text style={styles.sugestion}>@{sugestion.display_name}</Text>
    </TouchableOpacity>
  );

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
            <Mention sugestion={sugestion} key={i} />
          ))}
          {sugestionsAsync.map((sugestion, i) => (
            <Mention sugestion={sugestion} key={i} />
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
