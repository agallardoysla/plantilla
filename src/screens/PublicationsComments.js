import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../navigation/AuthProvider';
import comments_services from '../services/comments_services';
import CommentFormatter from '../utils/CommentFormatter';
import StylesConfiguration from '../utils/StylesConfiguration';

export default function PublicationsComments({postId, comment}) {
  const [newComment, setNewComment] = useState('');
  const [showAnswerToComments, setShowAnswerToComments] = useState(false);
  const [savingComment, setSavingComment] = useState(false);
  const {user} = useContext(AuthContext);

  const saveComment = async () => {
    setSavingComment(true);
    const _comment = {
      post: postId,
      user_owner: user,
      text: newComment,
      original_comment: comment.id,
    };
    setNewComment('');
    await comments_services.create(_comment);
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
              <Text style={styles.contentContainer}>
                <Text style={styles.sender}>
                  @{answer.user_owner.display_name} A @{comment.user_owner.display_name}
                </Text>
                <CommentFormatter
                  style={styles.content}
                  comment={answer.text}
                />
              </Text>
            </View>
          ))
        : null}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => setShowAnswerToComments(!showAnswerToComments)}>
          <Text style={styles.answerButton}>Responder</Text>
        </TouchableOpacity>
      </View>
      {showAnswerToComments ? 
        savingComment ? (
          <ActivityIndicator color={StylesConfiguration.color} />
        ) : (
          <TextInput
            style={styles.newComment}
            onChangeText={setNewComment}
            onSubmitEditing={saveComment}
            placeholder={'Responder a @' + comment.user_owner.display_name}
            placeholderTextColor={'white'}>
            {newComment}
          </TextInput>
        )
      : null}
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
    fontSize: 13,
    fontFamily: StylesConfiguration.fontFamily,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  newComment: {
    color: 'white',
    // fontFamily: StylesConfiguration.fontFamily,
    fontSize: 13,
    fontWeight: '200',
    backgroundColor: '#50555C',
    borderRadius: 10,
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginLeft: 40,
  },
});
