import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommentFormatter from '../utils/CommentFormatter';
import CommentInput from '../utils/CommentInput';
import StylesConfiguration from '../utils/StylesConfiguration';

export default function PublicationsComments({post, comment}) {
  const [showAnswerToComments, setShowAnswerToComments] = useState(false);
  const [savingComment, setSavingComment] = useState(false);

  const newCommentCallback = (_comment) => {
    comment.comments.push(_comment);
    setSavingComment(false);
    setShowAnswerToComments(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.comment}>
        <TouchableOpacity
          style={styles.senderContainer}
          onPress={() =>
            Alert.alert('Ir a perfil de' + comment.user_owner.display_name)
          }>
          <Image
            source={require('../assets/foto.png')}
            style={styles.icon_profile}
          />
          <Text style={styles.sender}>@{comment.user_owner.display_name}</Text>
        </TouchableOpacity>
        <CommentFormatter style={styles.content} comment={comment.text} />
      </View>
      {comment.comments && comment.comments.length > 0
        ? comment.comments.map((answer, i) => (
            <View style={[styles.comment, styles.answer]} key={i}>
              <Image
                source={require('../assets/foto.png')}
                style={styles.icon_profile}
              />
              <Text style={styles.sender}>
                @{answer.user_owner.display_name}
              </Text>
              <Text style={styles.contentContainer}>
                <CommentFormatter
                  style={styles.content}
                  comment={answer.text}
                />
              </Text>
            </View>
          ))
        : null}
      {showAnswerToComments ? (
        savingComment ? (
          <ActivityIndicator color={StylesConfiguration.color} />
        ) : (
          <CommentInput
            placeholder={'Responder a @' + comment.user_owner.display_name}
            callback={newCommentCallback}
            post={post}
            comment={comment}
            comments={comment.comments}
            setSavingComment={setSavingComment}
            style={styles.newComment}
            initialText={`@${comment.user_owner.display_name} `}
          />
        )
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => setShowAnswerToComments(!showAnswerToComments)}>
            <Text style={styles.answerButton}>Responder</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingLeft: 10,
  },
  comment: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  answer: {
    paddingLeft: 20,
  },
  icon_profile: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 400 / 2,
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flex: 1,
  },
  senderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  sender: {
    color: StylesConfiguration.color,
    fontWeight: 'bold',
    marginRight: 5,
  },
  content: {
    color: 'white',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  answerButton: {
    color: StylesConfiguration.color,
    fontSize: 11,
    fontFamily: StylesConfiguration.fontFamily,
  },
  newComment: {
    marginHorizontal: 10,
    marginVertical: 10,
    marginLeft: 40,
  },
});
