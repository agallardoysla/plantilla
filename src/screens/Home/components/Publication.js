/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import posts_services from '../../../services/posts_services';
import CommentInput from '../../../utils/CommentInput';
import CommentFormatter from '../../../utils/CommentFormatter';
import DateFormatter from '../../../components/DateFormatter';
import Counter from '../../../components/Counter';
import PublicationContent from './PublicationContent';
import GoBackButton from '../../../components/GoBackButton';
import {useNavigation} from '@react-navigation/native';
import PublishPublication from '../../NewPublication/components/PublishPublication';
import PublicationActions from './PublicationActions';
import files_services from '../../../services/files_services';
import {getFiles} from '../../../reducers/files';
import {isDate} from 'moment';
import PublicationComment from './PublicationComment';
import ProgressiveImage from '../../../components/ProgressiveImage';
import {useDispatch, useSelector} from 'react-redux';
import {
  addComment,
  reactToPublication,
  updatePublication,
} from '../../../redux/actions/feed';
import KeyboardSpacer from 'react-native-keyboard-spacer';

let window = Dimensions.get('window');

const Publication = ({feed, post, isFeed, sharePost, navigation, openMenu}) => {
  const {
    id,
    files_with_urls,
    comments,
    user_owner,
    views_count,
    reacted,
    reactionscount,
    reactions_details,
    text,
    created_at,
  } = post;

  const loadingNewComment = useSelector((state) => state.feed.addingComment);
  const updatingPublication = useSelector((state) => state.feed.refreshData);
  // const updatedPost = useSelector((state) => state.postDetails.post);
  const dispatch = useDispatch();
  const newDataAvailable = useSelector((state) => state.feed.refreshData);
  const [reaction, toggleReaction] = useState({
    reacted,
    reactionscount: reactionscount?.REACTION_TYPE_PRUEBA || 0,
  });
  const commentsCount = comments?.length || 0;
  const [commentsShown, toggleshowMoreComments] = useState(5);
  const [commentInputVal, setCommentInputVal] = useState('');
  const [isResponse, toggleIsResponse] = useState({
    state: false,
    to: undefined,
    id: undefined,
  });

  const commentInputRef = useRef(null);
  const toggleshowMoreCommentsIncrement = 3;

  const onSendComment = () => {
    if (commentInputVal.length > 0) {
      const commentData = {
        post: id,
        text: commentInputVal,
        original_comment: isResponse.id,
      };
      dispatch(addComment(commentData, feed, id));
      setCommentInputVal('');
      commentInputRef.current.value = '';
    }
  };

  const navigateProfile = (user) => {
    navigation.navigate('OtherProfileGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: user,
      },
    });
  };

  const handleCommentPress = (comment) => {
    let commenter = comment.user_owner;
    let commentId = comment.id;
    toggleIsResponse({state: true, to: commenter, id: commentId});
    commentInputRef.current.focus();
    commentInputRef.current.value = commentInputVal;
  };

  const handleCommentBlur = () => {
    toggleIsResponse({state: false, to: undefined, id: undefined});
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        {!isFeed && (
          <View style={styles.upperBar}>
            <GoBackButton navigation={navigation} />
          </View>
        )}
        <ScrollView>
          <View style={styles.ownerData}>
            <View
              style={[
                styles.ownerDisplayNameContainer,
                styles.ownerDisplayNameNotVerified,
              ]}>
              <Text style={styles.ownerDisplayName}>
                {user_owner?.display_name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigateProfile(user_owner.user_id);
              }}>
              <ProgressiveImage
                source={
                  user_owner?.photo !== null
                    ? {uri: user_owner?.photo}
                    : require('../../../assets/pride-dog_1.png')
                }
                resizeMode="cover"
                style={styles.image_profile}
                fadeDuration={0}
                thumbnailSource={require('../../../assets/FC_Logo.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{height: 400}}>
            <PublicationContent
              id={id}
              files={files_with_urls}
              showFullContent={true}
              style={styles.image_post}
              navigation={navigation}
              isFeed={isFeed}
              post={post}
              feed={feed}
            />
          </View>

          <View style={styles.icons_container}>
            <View style={styles.icon_numbers_view_container}>
              <Image
                source={require('../../../assets/ojo_vista.png')}
                style={[styles.icon_post, styles.icon_ojo]}
              />
              <Counter style={styles.icon_numbers_view} value={views_count} />
            </View>

            <View style={styles.icon_container}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(reactToPublication(id, !reaction.reacted, feed));
                  toggleReaction({
                    reacted: !reaction.reacted,
                    reactionscount: reaction.reacted
                      ? reaction.reactionscount - 1
                      : reaction.reactionscount + 1,
                  });
                }}
                onLongPress={() => {
                  navigation.navigate('PostLikes', {
                    reactions_details,
                    files_with_urls,
                    reactionscount: reaction.reactionscount,
                  });
                }}>
                <Image
                  style={[styles.icon_post, styles.icon_corazon]}
                  source={
                    reaction.reacted
                      ? require('../../../assets/corazon_limon.png')
                      : require('../../../assets/corazon_gris.png')
                  }
                  fadeDuration={0}
                />
              </TouchableOpacity>
              <Counter
                style={styles.icon_numbers_like}
                value={reaction.reactionscount}
              />
            </View>
            <View style={styles.icon_container}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PostComments', {
                    comments,
                    files_with_urls,
                    commentsCount,
                  })
                }>
                <Image
                  source={require('../../../assets/comentario.png')}
                  style={[styles.icon_post, styles.icon_comentario]}
                />
              </TouchableOpacity>
              <Counter style={styles.icon_numbers_view} value={commentsCount} />
            </View>
            <View style={styles.icon_container}>
              <TouchableOpacity onPress={sharePost}>
                <Image
                  source={require('../../../assets/compartir.png')}
                  style={[styles.icon_post, styles.icon_compartir]}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{...styles.icon_container, justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={openMenu}>
                <Image
                  source={require('../../../assets/menu_desbordamiento.png')}
                  style={[styles.icon_post, styles.icon_mostrarMas]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.description_container}>
            {text && text !== '__post_text__' && (
              <CommentFormatter
                style={styles.description}
                comment={`(${user_owner.display_name}:${id}): ${text}`}
                navigation={navigation}
              />
            )}
          </View>
          <ScrollView>
            {comments &&
              comments.map((comment, index) => {
                return index < commentsShown ? (
                  <PublicationComment
                    style={styles.publicationComments}
                    comment={comment}
                    onPress={handleCommentPress}
                    key={index}
                    navigation={navigation}
                    commentInputRef={commentInputRef}
                  />
                ) : (
                  <></>
                );
              })}
            {commentsCount > commentsShown ? (
              <TouchableOpacity
                onPress={() =>
                  toggleshowMoreComments(
                    commentsShown + toggleshowMoreCommentsIncrement,
                  )
                }>
                <Text style={styles.showMoreComments}>
                  {commentsCount - commentsShown} comentario
                  {commentsCount - commentsShown === 1 ? '' : 's'} mas...
                </Text>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
          {(loadingNewComment || updatingPublication) && (
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="small" color="#E8FC64" />
            </View>
          )}
        </ScrollView>
      </View>
      <View style={{backgroundColor: 'black', padding: 8}}>
        {isResponse.state && (
          <CommentFormatter
            style={{
              color: 'white',
            }}
            comment={`En respuesta a (${isResponse.to.display_name}:${isResponse.to.user_id})`}
            navigation={navigation}
          />
        )}
        <View style={{alignItems: 'flex-end'}}>
          <DateFormatter date={created_at} />
        </View>
        <CommentInput
          placeholder={
            isResponse.state ? 'Responder' : 'Escribir un nuevo comentario...'
          }
          onChangeText={setCommentInputVal}
          value={commentInputVal}
          post={post}
          comments={comments}
          onSendComment={onSendComment}
          style={styles.newComment}
          commentInputRef={commentInputRef}
          onBlur={handleCommentBlur}
        />
      </View>

      {!isFeed && <KeyboardSpacer />}
    </View>
  );
};
 export default Publication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  upperBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 35,
  },
  ownerData: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0,
    paddingTop: 20,
  },
  ownerVerified: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  ownerDisplayNameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  ownerDisplayNameVerified: {
    flex: 0,
  },
  ownerDisplayNameNotVerified: {
    flex: 1,
  },
  ownerDisplayName: {
    color: 'white',
    fontWeight: '500',
  },
  postImagesContainer: {
    height: 360,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

    marginHorizontal: 5,
    // backgroundColor: 'blue',
  },
  postImagesContainerPresable: {
    // height: 360,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
  image_post: {
    width: window.width,
    minHeight: 360,
  },
  icons_container: {
    justifyContent: 'center',
    // height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginVertical: 5,
  },
  icon_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-around',
    height: 22,
    marginTop: 0,
  },
  icon_post: {
    marginRight: 0,
  },
  icon_ojo: {
    width: 20,
    height: 20,
  },
  icon_corazon: {
    width: 15,
    height: 15,
    marginTop: 4,
  },
  icon_comentario: {
    width: 22,
    height: 22,
  },
  icon_compartir: {
    width: 18,
    height: 18,
    marginTop: 2,
  },
  icon_mostrarMas: {
    margin: 6,
    justifyContent: 'flex-start',
    // height: 15,
  },
  icon_numbers_view_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-around',
    // height: 20,
  },
  icon_numbers_view: {
    color: 'white',
    fontSize: 14,
    marginTop: 3,
    marginHorizontal: 4,
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  icon_numbers_like: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 4,
    marginTop: 3,
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  icon_numbers_comment: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: -5,
  },
  icon_menu_desbordamiento: {
    top: 0,
    left: 0,
  },
  description: {
    flex: 1,
    color: 'white',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  description_container: {
    padding: 8,
    paddingLeft: 0,
  },
  publicationComments: {
    flex: 1,
  },
  showMoreComments: {
    color: 'gray',
    marginBottom: 10,
    left: 10,
    textAlign: 'left',
  },
  newComment: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  row_header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#242424',

    marginBottom: 10,
    marginRight: 5,
  },

  sobre_amarillo: {
    width: 42,
    height: 42,
  },
  image_profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 14,
    marginBottom: 5,
  },
  publicationDate: {
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginTop: 5,
  },
});
