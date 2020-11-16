import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Video from 'react-native-video-player';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import posts_services from '../../../services/posts_services';
import PublicationsComments from '../../Home/components/PublicationsComments';
import CommentInput from '../../../utils/CommentInput';
import CommentFormatter from '../../../utils/CommentFormatter';
import DateFormatter from '../../../components/DateFormatter';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../../../reducers/loggedUser';
import { getPost } from '../../../reducers/posts';
import Counter from '../../../components/Counter';
import { getPostComments } from '../../../reducers/comments';
import { addPostReactions, createPostReaction, getPostReactions, removePostReaction } from '../../../reducers/postReactions';
import { getUser } from '../../../reducers/users';
import { getProfile } from '../../../reducers/profiles';
import { getPostToFilesByPost } from '../../../reducers/postsToFiles';
import { getFile, getFilesFromIds } from '../../../reducers/files';
import { setPostToShare } from '../../../reducers/postToShare';
import { setShowSharePost } from '../../../reducers/showSharePost';
let window = Dimensions.get('window');

export default function Publication({ postId, navigation, showFullContent }) {
  const post = useSelector(getPost(postId));
  const comments = useSelector(getPostComments(postId));
  const postReactions = useSelector(getPostReactions(postId));
  const postFiles = useSelector(getPostToFilesByPost(postId));
  const files = useSelector(getFilesFromIds(postFiles));
  const owner = useSelector(getUser(post.user_id));
  const ownerProfile = useSelector(getProfile(owner.profile_id));
  const ownerPhoto = useSelector(getFile(ownerProfile.photo_id));
  const user = useSelector(getLoggedUser);
  let reactionId = 0;

  const getLikesCounter = () => {
    return postReactions ? postReactions.length : 0;
  };

  const getILiked = () => {
    const reaction = postReactions.filter((reaction) => reaction.user_id === user.id);
    reactionId = reaction.length > 0 ? reaction[0].id : 0;
    return reaction.length > 0;
  };

  const [showComments, setShowComments] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [firstTimeLoadingComments, setFirstTimeLoadingComments] = useState(
    true,
  );
  const [savingComment, setSavingComment] = useState(false);
  const [countComments, setCountComments] = useState(comments.length);
  const dispatch = useDispatch();

  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  const toView = () => {
    if (files.length > 0) {
      return isImage(files[0].url_original) ? (
        <ScrollView horizontal={true} indicatorStyle="white">
          {files.map((file, i) => (
            <Image
              source={{ uri: showFullContent ? file.url_original : file.url_half }}
              style={[styles.image_post, i >= 1 ? { marginLeft: 10 } : {}]}
              key={i}
              resizeMode="contain"
              fadeDuration={0}
            />
          ))}
        </ScrollView>
      ) : (
        <Video
          video={{ uri: files[0].url_original }}
          style={styles.image_post}
          autoplay={true}
          defaultMuted={true}
          loop={true}
        />
      );
    } else {
      return null;
    }
  };

  const getAndSetShowComments = () => {
    // if (!firstTimeLoadingComments) {
    //   setShowComments(!showComments);
    //   console.log('get comments', showComments, loadingComments);
    // } else {
    //   setFirstTimeLoadingComments(false);
    // }
    // setLoadingComments(true);
    // if (showComments) {
    //   posts_services.getComments(postId).then((res) => {
    //     setComments(res.data);
    //     setLoadingComments(false);
    //   });
    // } else {
    //   setLoadingComments(false);
    //   setShowComments(true);
    // }
  };

  const newCommentCallback = (comment) => {
    // setComments([...comments, comment]);
    setSavingComment(false);
    // getAndSetShowComments();
  };

  const AddLike = async () => {
    try {
      //si contiene algo lo elimino si no lo agrego
      if (getILiked()) {
        posts_services.deleteReaction(postId);
        dispatch(removePostReaction(reactionId));
      } else {
        posts_services.addReaction(postId, 2);
        dispatch(addPostReactions([createPostReaction(postId, user.id)]));
        // setLikesCounter(likesCounter + 1);
      }
    } catch (error) {
      console.log('Error de agregar like' + error);
    }
  };

  const goToPost = () => {
    navigation.navigate('PostGroup', {
      screen: 'PublicationDetails',
      params: {
        postId,
      },
    });
  };

  const sharePost = () => {
    dispatch(setPostToShare(post));
    dispatch(setShowSharePost(true));
  };

  return (
    <>
      <View style={styles.container}>
        {/*Inicia Nombre de usuario, foto, verificacion de cuenta*/}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OtherProfileGroup', {
              screen: 'OtherProfile',
              params: {
                user_id: post.user_id,
              },
            })
          }>
          <View style={{ flexDirection: 'row' }}>
            {owner.account_verified ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Image source={require('../../../assets/tilde.png')} />
              </View>
            ) : null}

            <View
              style={{
                flexDirection: 'column',
                flex: owner.account_verified ? 0 : 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text style={styles.encabezado_text}>
                {' '}
                @{owner.display_name}{' '}
              </Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <Image
                source={
                  ownerPhoto
                    ? {uri: ownerPhoto.url_original}
                    : require('../../../assets/pride-dog_1.png')
                }
                resizeMode="cover"
                style={styles.image_profile}
                fadeDuration={0}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/*Finaliza Nombre de usuario como encabezado*/}

        {/*Inicia Foto de la publicaciòn */}
        {files.length > 0 ? (
          <View style={styles.postImagesContainer}>
            <TouchableWithoutFeedback
              style={styles.postImagesContainerPresable}
              onPress={goToPost}>
              {toView(files)}
            </TouchableWithoutFeedback>
          </View>
        ) : null}
        {/*Finaliza Foto de la publicaciòn*/}

        {/*Inicio de iconos de la publicaciòn*/}
        <View style={styles.icons_container}>
          <View style={styles.icon_container}>
            <Image
              source={require('../../../assets/ojo_vista.png')}
              style={[styles.icon_post, styles.icon_ojo]}
            />
            <Counter
              style={styles.icon_numbers_view}
              value={post.views_count}
            />
          </View>

          <View style={styles.icon_container}>

            <TouchableOpacity onPress={AddLike}>
              <Image
                source={
                  getILiked()
                    ? require('../../../assets/corazon_limon.png')
                    : require('../../../assets/corazon_gris.png')
                }
                fadeDuration={0}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.icon_numbers_view_container}
              onPress={() =>
                navigation.navigate('PostLikes', owner.display_name)
              }> */}
            <Counter style={styles.icon_numbers_view} value={getLikesCounter()} />
            {/* </TouchableOpacity> */}
          </View>

          <View style={styles.icon_container}>
            <TouchableOpacity onPress={getAndSetShowComments}>
              <Image
                source={require('../../../assets/comentario.png')}
                style={[styles.icon_post, styles.icon_comentario]}
              />
            </TouchableOpacity>
            <Counter style={styles.icon_numbers_view} value={countComments} />
          </View>

          <TouchableOpacity onPress={sharePost} style={styles.icon_container}>
            <Image
              source={require('../../../assets/compartir.png')}
              style={[styles.icon_post, styles.icon_compartir]}
            />
          </TouchableOpacity>

          <View style={styles.icon_container}>
            <Image
              source={require('../../../assets/menu_desbordamiento.png')}
              style={[styles.icon_post, styles.icon_mostrarMas]}
            />
          </View>
        </View>
        {/*Fin de iconos de una publicaciòn*/}

        {/*Inicio de nombre de usuario y la descripciòn de la publicaciòn*/}
        <CommentFormatter
          style={styles.description}
          comment={
            '(' +
            owner.display_name +
            ':' +
            post.user_id +
            ') ' +
            (post.text === '__post_text__' ? '' : post.text)
          }
          navigation={navigation}
        />
        {/*Fin de nombre de usuario y la descripciòn de la publicaciòn*/}

        {/*Inicia comentarios hacia la publicaciòn */}
        {showComments ? (
          loadingComments ? (
            <ActivityIndicator color={StylesConfiguration.color} />
          ) : (
            comments.map((comment, i) => (
              <PublicationsComments
                style={styles.publicationComments}
                post={post}
                comment={comment}
                key={i}
                comments={comments}
                navigation={navigation}
                setCountComments={setCountComments}
                countComments={countComments}
              />
            ))
          )
        ) : null}

        {firstTimeLoadingComments && comments.length > 3 ? (
          <TouchableOpacity onPress={getAndSetShowComments}>
            <Text
              style={{
                color: 'gray',
                marginBottom: 10,
                left: 10,
                textAlign: 'left',
              }}>
              {comments.length - 3} comentario
              {comments.length == 4 ? '' : 's'} mas...
            </Text>
          </TouchableOpacity>
        ) : null}

        {/*Inicia nuevo comentario hacia la publicaciòn */}
        {savingComment ? (
          <ActivityIndicator color={StylesConfiguration.color} />
        ) : (
          <CommentInput
            placeholder={'Escribir un nuevo comentario...'}
            callback={newCommentCallback}
            post={post}
            comments={comments}
            setSavingComment={setSavingComment}
            style={styles.newComment}
            initialText={''}
            setCountComments={setCountComments}
            countComments={countComments}
          />
        )}
        {/*Fin de nuevo comentario hacia la publicaciòn */}

        {/*Inicia fecha*/}
        <View style={{ alignSelf: 'flex-end', marginHorizontal: 20, marginTop: 5 }}>
          <DateFormatter date={post.created_at} />
        </View>
        {/*Finaliza fecha */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'black',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  encabezado_text: {
    color: 'white',
    fontWeight: 'bold',
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
    // flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon_post: {
    marginRight: 10,
  },
  icon_ojo: {
    width: 25,
    height: 25,
  },
  icon_corazon: {
    width: 25,
    height: 25,
  },
  icon_comentario: {
    width: 25,
    height: 25,
  },
  icon_compartir: {
    width: 25,
    height: 25,
  },
  icon_mostrarMas: {
    width: 33,
    height: 10,
  },
  icon_numbers_view_container: {
    top: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: -5,
    color: 'white',
    minWidth: 30,
  },
  icon_numbers_view: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 5,
  },
  icon_numbers_like: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 5,
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
  publicationComments: {
    flex: 1,
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
});
