import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../../../reducers/loggedUser';
import CommentFormatter from '../../../utils/CommentFormatter';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { getComment, removeComment } from '../../../reducers/comments';
import comments_services from '../../../services/comments_services';
import CommentInput from '../../../utils/CommentInput';
import { getUser } from '../../../reducers/users';
import { getProfile } from '../../../reducers/profiles';
import { getFile } from '../../../reducers/files';

export default function CommentAnswer({answer, post, navigation}) {
  const [savingAnswer, setSavingAnswer] = useState(false);
  const [showMenuAnswer, setShowMenuAnswer] = useState(false);
  const [editingAnswer, setEditingAnswer] = useState(false);
  const answerOwner = useSelector(getUser(answer.user_id));
  const answerOwnerProfile = useSelector(getProfile(answerOwner.profile_id));
  const ownerPhoto = useSelector(getFile(answerOwnerProfile.photo_id));
  const user = useSelector(getLoggedUser);
  const dispatch = useDispatch();

  const edittedAnswerCallback = () => {
    setEditingAnswer(false);
    setSavingAnswer(false);
    setShowMenuAnswer(false);
  };

  const doDeleteAnswer = () => {
    dispatch(removeComment(answer.id));
    setShowMenuAnswer(false);
    comments_services.delete(answer.id);
  };

  return (
    <TouchableHighlight
      style={styles.commentContainer}
      onLongPress={() => setShowMenuAnswer(true)}
      underlayColor={StylesConfiguration.colorSelection}>
      <View style={[styles.comment, styles.answer]}>
        <Image
          source={
            ownerPhoto
              ? {uri: ownerPhoto.url_small}
              : require('../../../assets/foto.png')
          }
          style={styles.icon_profile}
        />
        {editingAnswer ? (
          savingAnswer ? (
            <ActivityIndicator color={StylesConfiguration.color} />
          ) : (
            <CommentInput
              placeholder={''}
              callback={edittedAnswerCallback}
              post={post}
              comment={answer}
              setSavingComment={setSavingAnswer}
              style={styles.newComment}
              initialText={answer.text}
              isEdition={true}
            />
          )
        ) : (
          <>
            <CommentFormatter
              style={styles.content}
              comment={`{${answerOwner.display_name}:${answerOwner.id}} ${answer.text}`}
              navigation={navigation}
            />
            <Menu
              opened={showMenuAnswer && answerOwner.id === user.id}
              onBackdropPress={() => setShowMenuAnswer(true)}>
              <MenuTrigger />
              <MenuOptions customStyles={menuOptions}>
                <MenuOption
                  onSelect={() => setEditingAnswer(true)}
                  text="Editar respuesta"
                />
                <MenuOption onSelect={doDeleteAnswer}>
                  <Text style={{color: 'red'}}>Eliminar</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </>
        )}
      </View>
    </TouchableHighlight>
  );
};


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
