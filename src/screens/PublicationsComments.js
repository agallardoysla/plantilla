import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommentFormatter from '../utils/CommentFormatter';
import CommentInput from '../utils/CommentInput';
import StylesConfiguration from '../utils/StylesConfiguration';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {AuthContext} from '../navigation/AuthProvider';
import comments_services from '../services/comments_services';

export default function PublicationsComments({
  post,
  comment,
  comments,
  setComments,
  navigation,
  setCountComments,
  countComments,
}) {
  const [showAnswerToComments, setShowAnswerToComments] = useState(false);
  const [savingComment, setSavingComment] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editingComment, setEditingComment] = useState(false);
  const [answers, setAnswers] = useState(comment.comments);
  const [savingAnswer, setSavingAnswer] = useState(answers.map(() => false));
  const [showMenuAnswer, setShowMenuAnswer] = useState(
    answers.map(() => false),
  );
  const [editingAnswer, setEditingAnswer] = useState(answers.map(() => false));
  const {user} = useContext(AuthContext);

  const showMenuForAnswer = (index) => {
    console.log(index);
    setShowMenuAnswer(answers.map((_, i) => i === index));
  };

  const editForAnswer = (index) => {
    setEditingAnswer(answers.map((_, i) => i === index));
  };

  const edittedAnswerCallback = (index) => (_comment) => {
    answers[index].text = _comment.text;
    setAnswers(
      answers.map((a, i) => {
        if (i === index) {
          a.text = _comment.text;
        }
        return a;
      }),
    );
    editForAnswer(-1);
    setSavingForAnswer(-1);
    setShowMenu(false);
  };

  const setSavingForAnswer = (index) => () => {
    setSavingAnswer(savingAnswer.map((_, i) => i === index));
  };

  const newCommentCallback = (_comment) => {
    setAnswers([...answers, _comment]);
    setSavingComment(false);
    setShowAnswerToComments(false);
  };

  const edittedCommentCallback = (_comment) => {
    comment.text = _comment.text;
    setEditingComment(false);
    setShowMenu(false);
  };

  const doDeleteComment = () => {
    comments_services.delete(comment.id).then((res) => {
      setComments(comments.filter((c) => c.id !== comment.id));
      setCountComments(countComments - 1); //a nivel local resto 1 al comment
      setShowMenu(false);
    });
  };

  const doDeleteAnswer = (index) => () => {
    comments_services.delete(answers[index].id).then((_) => {
      setAnswers(answers.filter((_, i) => i !== index));
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
              navigation.navigate('OtherProfile', {
                user_id: comment.user_owner,
                navigation,
              })
            }>
            <Image
              source={require('../assets/foto.png')}
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
                setCountComments={setCountComments}
              />
            )
          ) : (
            <>
              <CommentFormatter
                style={styles.content}
                comment={
                  `{${comment.user_owner.display_name}:${comment.user_owner.user_id}} ` +
                  comment.text
                }
                navigation={navigation}
              />
              <Menu
                opened={showMenu && comment.user_owner.user_id === user.id}
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
        ? answers.map((answer, i) => (
            <TouchableHighlight
              style={styles.commentContainer}
              onLongPress={() => showMenuForAnswer(i)}
              key={i}
              underlayColor={StylesConfiguration.colorSelection}>
              <View style={[styles.comment, styles.answer]}>
                <Image
                  source={require('../assets/foto.png')}
                  style={styles.icon_profile}
                />
                {editingAnswer[i] ? (
                  savingAnswer[i] ? (
                    <ActivityIndicator color={StylesConfiguration.color} />
                  ) : (
                    <CommentInput
                      placeholder={''}
                      callback={edittedAnswerCallback(i)}
                      post={post}
                      comment={answer}
                      setSavingComment={setSavingForAnswer(i)}
                      style={styles.newComment}
                      initialText={answer.text}
                      isEdition={true}
                      setCountComments={setCountComments}
                    />
                  )
                ) : (
                  <>
                    <CommentFormatter
                      style={styles.content}
                      comment={`{${answer.user_owner.display_name}:${answer.user_owner.user_id}} ${answer.text}`}
                      navigation={navigation}
                    />
                    <Menu
                      opened={
                        showMenuAnswer[i] &&
                        answer.user_owner.user_id === user.id
                      }
                      onBackdropPress={() => showMenuForAnswer(-1)}>
                      <MenuTrigger />
                      <MenuOptions customStyles={menuOptions}>
                        <MenuOption
                          onSelect={() => editForAnswer(i)}
                          text="Editar comentario"
                        />
                        <MenuOption onSelect={doDeleteAnswer(i)}>
                          <Text style={{color: 'red'}}>Eliminar</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </>
                )}
              </View>
            </TouchableHighlight>
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
            comments={answers}
            setSavingComment={setSavingComment}
            style={styles.newComment}
            initialText={`@${comment.user_owner.display_name} `}
            setCountComments={setCountComments}
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
