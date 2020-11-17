import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommentFormatter from '../../../utils/CommentFormatter';
import CommentInput from '../../../utils/CommentInput';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import comments_services from '../../../services/comments_services';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedUser} from '../../../reducers/loggedUser';
import { getCommentAnswers, removeComment } from '../../../reducers/comments';
import { getUser } from '../../../reducers/users';
import CommentAnswer from './CommentAnswer';

export default function PublicationComment({
  post,
  comment,
  comments,
  setComments,
  navigation,
}) {
  const [showAnswerToComments, setShowAnswerToComments] = useState(false);
  const [savingComment, setSavingComment] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editingComment, setEditingComment] = useState(false);
  const answers = useSelector(getCommentAnswers(comment.id));
  const commentOwner = useSelector(getUser(comment.user_id));

  const newCommentCallback = () => {
    setSavingComment(false);
    setShowAnswerToComments(false);
  };

  const edittedCommentCallback = () => {
    setEditingComment(false);
    setShowMenu(false);
  };

  const doDeleteComment = () => {
    comments_services.delete(comment.id).then((res) => {
      setComments(comments.filter((c) => c.id !== comment.id));
      setShowMenu(false);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.commentContainer}
        onLongPress={() => setShowMenu(true)}
        underlayColor={StylesConfiguration.colorSelection}>
        <View style={styles.comment}>
          <TouchableOpacity
            style={styles.senderContainer}
            onPress={() =>
              navigation.navigate('OtherProfileGroup', {
                screen: 'OtherProfile',
                params: {
                  user_id: commentOwner.user_id,
                },
              })
            }>
            <Image
              source={require('../../../assets/foto.png')}
              style={styles.icon_profile}
            />
          </TouchableOpacity>
          {editingComment ? (
            savingComment ? (
              <ActivityIndicator color={StylesConfiguration.color} />
            ) : (
              <CommentInput
                placeholder={''}
                callback={edittedCommentCallback}
                post={post}
                comment={comment}
                setSavingComment={setSavingComment}
                style={styles.newComment}
                initialText={comment.text}
                isEdition={true}
              />
            )
          ) : (
            <>
              <CommentFormatter
                style={styles.content}
                comment={
                  `{${commentOwner.display_name}:${commentOwner.user_id}} ` +
                  comment.text
                }
                navigation={navigation}
              />
              <Menu
                opened={showMenu && commentOwner.user_id === user.id}
                onBackdropPress={() => setShowMenu(false)}>
                <MenuTrigger />
                <MenuOptions customStyles={menuOptions}>
                  <MenuOption
                    onSelect={() => setEditingComment(true)}
                    text="Editar comentario"
                  />
                  <MenuOption onSelect={doDeleteComment}>
                    <Text style={{color: 'red'}}>Eliminar</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </>
          )}
        </View>
      </TouchableHighlight>
      {answers && answers.length > 0
        ? answers.map((answer, i) => <CommentAnswer answer={answer} key={i} />)
        : null}
      {showAnswerToComments ? (
        savingComment ? (
          <ActivityIndicator color={StylesConfiguration.color} />
        ) : (
          <CommentInput
            placeholder={'Responder a @' + commentOwner.display_name}
            callback={newCommentCallback}
            post={post}
            comment={comment}
            comments={answers}
            setSavingComment={setSavingComment}
            style={styles.newComment}
            initialText={`@${commentOwner.display_name} `}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingLeft: 10,
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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

const menuOptions = {
  optionsContainer: {
    backgroundColor: '#898A8D',
    padding: 5,
    borderColor: StylesConfiguration.color,
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
  },
  optionText: {
    color: 'black',
  },
};
