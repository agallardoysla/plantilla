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
import {
  getComment,
  getCommentAnswers,
  removeComment,
} from '../../../reducers/comments';
import {getUser} from '../../../reducers/users';
import CommentAnswer from './CommentAnswer';
import {getProfile} from '../../../reducers/profiles';
import {getFile} from '../../../reducers/files';
import {deleteCommentPost} from '../../../reducers/posts';
import DateFormatter from '../../../components/DateFormatter';

export default function PublicationComment({
  post,
  onPress,
  comment,
  navigation,
}) {
  const {text, user_owner: commenter, created_at, comments} = comment;
  const {
    account_verified,
    display_name,
    first_name,
    last_name,
    photo,
    user_id,
  } = commenter;

  const hasComments = comments.length > 0;

  // const comment = useSelector(getComment(commentId.id));
  // const [showAnswerToComments, setShowAnswerToComments] = useState(false);
  // const [savingComment, setSavingComment] = useState(false);
  // const [showMenu, setShowMenu] = useState(false);
  // const [editingComment, setEditingComment] = useState(false);
  // // const [commentOwner, setCommentOwner] = useState(null);
  // const commentOwner = useSelector(getUser(comment.user_id));
  // const commentOwnerProfile = useSelector(getProfile(commentOwner.profile_id));
  // const ownerPhoto = useSelector(getFile(commentOwnerProfile.photo_id));
  // const loggedUser = useSelector(getLoggedUser);
  // const dispatch = useDispatch();

  // // console.log('comment', comment)

  // const newCommentCallback = () => {
  //   setSavingComment(false);
  //   setShowAnswerToComments(false);
  // };

  // const edittedCommentCallback = () => {
  //   setEditingComment(false);
  //   setShowMenu(false);
  // };

  // const doDeleteComment = () => {
  //   dispatch(removeComment(commentId));
  //   dispatch(deleteCommentPost({postId: post.id, commentId: commentId}));
  //   setShowMenu(false);
  //   comments_services.delete(commentId);
  // };

  // return <Text style={{color:'white'}}>{`Comment: ${text}`}</Text>
  // return comment.original_comment_id !== null ? null : (
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.commentContainer}
        onPress={() => onPress(comment)}
        underlayColor={StylesConfiguration.colorSelection}>
        <View style={{flexDirection: 'column'}}>
          <View style={styles.comment}>
            <TouchableOpacity
              style={styles.senderContainer}
              onPress={() =>
                navigation.navigate('OtherProfileGroup', {
                  screen: 'OtherProfile',
                  params: {
                    user_id,
                  },
                })
              }>
              <Image
                source={
                  photo ? {uri: photo} : require('../../../assets/foto.png')
                }
                style={styles.icon_profile}
              />
            </TouchableOpacity>
            <CommentFormatter
              style={styles.content}
              comment={`(${display_name}:${user_id}): ${
                text === '__post_text__' ? '' : text
              }`}
              navigation={navigation}
            />
          </View>
          <DateFormatter date={created_at} />
          {hasComments &&
            comments.map((comment, index) => {
              return (
                <PublicationComment
                  style={styles.publicationComments}
                  comment={comment}
                  onPress={onPress}
                  key={`${comment.id}-${index}`}
                  navigation={navigation}
                />
              );
            })}
        </View>
      </TouchableHighlight>
      {/* <Menu opened={showMenu} onBackdropPress={() => setShowMenu(false)}>
        <MenuTrigger />
        <MenuOptions customStyles={menuOptions}>
          {/* <MenuOption
            onSelect={() => setEditingComment(true)}
            text="Editar comentario"
          /> *
          <MenuOption>
            <Text style={{color: 'red'}}>Eliminar</Text>
          </MenuOption>
        </MenuOptions>
      </Menu> */}
    </View>
  );
  //         {editingComment ? (
  //           savingComment ? (
  //             <ActivityIndicator color={StylesConfiguration.color} />
  //           ) : (
  //             <CommentInput
  //               placeholder={''}
  //               callback={edittedCommentCallback}
  //               post={post}
  //               comment={comment}
  //               setSavingComment={setSavingComment}
  //               style={styles.newComment}
  //               initialText={comment.text}
  //               isEdition={true}
  //             />
  //           )
  //         ) : (
  //           <>
  //             <CommentFormatter
  //               style={styles.content}
  //               comment={
  //                 `{${commentOwner.display_name}:${commentOwner.id}} ` +
  //                 comment.text
  //               }
  //               navigation={navigation}
  //             />

  //    </>
  //         )}
  //       </View>
  //     </TouchableHighlight>
  //     {comment.comments.map((answerId, i) => (
  //       <CommentAnswer
  //         answerId={answerId}
  //         post={post}
  //         navigation={navigation}
  //         key={i}
  //       />
  //     ))}
  //     {showAnswerToComments ? (
  //       savingComment ? (
  //         <ActivityIndicator color={StylesConfiguration.color} />
  //       ) : (
  //         <CommentInput
  //           placeholder={'Responder a @' + commentOwner.display_name}
  //           callback={newCommentCallback}
  //           post={post}
  //           comment={comment}
  //           setSavingComment={setSavingComment}
  //           style={styles.newComment}
  //           initialText={`@${commentOwner.display_name} `}
  //         />
  //       )
  //     ) : (
  //       <View style={styles.actions}>
  //         <TouchableOpacity
  //           onPress={() => setShowAnswerToComments(!showAnswerToComments)}>
  //           <Text style={styles.answerButton}>Responder</Text>
  //         </TouchableOpacity>
  //       </View>
  //     )}
  //   </View>
  // );
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
