import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
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

let window = Dimensions.get('window');

export default function Publication({
  // data
  post,
  isFeed,
  postReactions,
  ownerProfile,
  ownerPhoto,
  loggedUser,
  // actions
  goToOwnerProfile,
  addLike,
  getAndSetShowComments,
  sharePost,
  newCommentCallback,
  navigation,
  openMenu
}) {
  const {
    id,
    files_with_urls,
    comments,
    user_owner,
    views_count,
    reacted,
    reactionscount,
    text,
  } = post;

  const [reaction, toggleReaction] = useState({
    reacted,
    reactionscount: reactionscount?.REACTION_TYPE_PRUEBA || 0,
  });
  const commentsCount = comments.length;
  const [commentsShown, toggleshowMoreComments] = useState(5);
  const toggleshowMoreCommentsIncrement = 3;
  /**
   * Estados agregados para actualzar internamente los contadores de reaciones y comentarios
   */
  // const [reactions, setReactions] = useState(0);
  // const [commentsCount, setcommentsCount] = useState(0);
  // let reactionId = 0;

  /**
   * Esta función permite hacer las soliciutdes al servidor de los cambios y actualizar los estados
   */
  // const updateData = () => {
  //   posts_services.get(post.id).then((res) => {
  //     console.log(res.data);
  //     setcommentsCount(res.data.comments.length ? res.data.comments.length : 0);
  //     setReactions(
  //       res.data.posts_reactions.length ? res.data.posts_reactions.length : 0,
  //     );
  //   });
  // };

  /**
   * Usamos el clico de vida con hooks para disparar el evento de actualización de cada contador
   */

  // useEffect(() => {
  //   updateData();
  // }, [postReactions]);

  // useEffect(() => {
  //   updateData();
  // }, [comments]);

  // useEffect(() => {
  //   updateData();
  // }, []);

  // const getILiked = () => {
  //   const reaction = postReactions.filter(
  //     (reaction) => reaction.user_id === loggedUser.id,
  //   );
  //   reactionId = reaction.length > 0 ? reaction[0].id : 0;
  //   return reaction.length > 0;
  // };

  // const [showComments, setShowComments] = useState(true);
  // const [loadingComments, setLoadingComments] = useState(false);
  // const [firstTimeLoadingComments, setFirstTimeLoadingComments] = useState(
  //   true,
  // );
  // const [savingComment, setSavingComment] = useState(false);

  const navigateProfile = (user) => {
    navigation.navigate('OtherProfileGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: user,
      },
    });
  }

  return (
    <>
      <View style={styles.container}>
        {!isFeed && (
          <View style={styles.upperBar}>
            <GoBackButton navigation={navigation} />
          </View>
        )}

        <TouchableOpacity onPress={() => {navigateProfile(user_owner.user_id)}}>
          <View style={styles.ownerData}>
            {user_owner.account_verified ? (
              <Image
                source={require('../../../assets/tilde.png')}
                style={styles.ownerVerified}
              />
            ) : null}
            <View
              style={[
                styles.ownerDisplayNameContainer,
                user_owner.account_verified
                  ? styles.ownerDisplayNameVerified
                  : styles.ownerDisplayNameNotVerified,
              ]}>
              <Text style={styles.ownerDisplayName}>
                @{user_owner.display_name}{' '}
              </Text>
            </View>
            <ProgressiveImage
              source={
                user_owner.photo !== null
                  ? {uri: user_owner.photo}
                  : require('../../../assets/pride-dog_1.png')
              }
              resizeMode="cover"
              style={styles.image_profile}
              fadeDuration={0}
              thumbnailSource={require('../../../assets/FC_Logo.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <PublicationContent
            id={id}
            files={files_with_urls}
            showFullContent={true}
            style={styles.image_post}
            navigation={navigation}
            isFeed={isFeed}
            post={post}
          />
        </TouchableOpacity>
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
              onPress={() =>
                toggleReaction({
                  reacted: !reaction.reacted,
                  reactionscount: reaction.reacted
                    ? reaction.reactionscount - 1
                    : reaction.reactionscount + 1,
                })
              }>
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
            <TouchableOpacity onPress={getAndSetShowComments}>
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
          <View style={{...styles.icon_container, justifyContent:'flex-end'}}>
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

        {comments &&
          comments.map((comment, index) => {
            return index < commentsShown ? (
              <PublicationComment
                style={styles.publicationComments}
                post={post}
                comment={comment}
                key={index}
                navigation={navigation}
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
        {/*Finaliza Nombre de usuario como encabezado*/}

        {/*Inicia Foto de la publicaciòn */}
        {/* {files && files.length > 0 ? (
          <PublicationContent
            files={files}
            showFullContent={showFullContent}
            style={styles.image_post}
          />
        ) :  
        // <View style={styles.postImagesContainer}>
        //   <Pressable
        //     style={styles.postImagesContainerPresable}
        //     onPress={goToPost}>
        //     <PublicationContent
        //       files={files}
        //       showFullContent={showFullContent}
        //       style={styles.image_post}
        //     />
        //   </TouchableWithoutFeedback>
        // </View>
        null}*/}
        {/*Finaliza Foto de la publicaciòn*/}

        {/*Inicio de iconos de la publicaciòn*/}

        {/*        
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
            <TouchableOpacity onPress={addLike}>
              <Image
                source={
                  getILiked()
                    ? require('../../../assets/corazon_limon.png')
                    : require('../../../assets/corazon_gris.png')
                }
                fadeDuration={0}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.icon_numbers_view_container}
              onPress={() =>
                navigation.navigate('PostLikes', owner.display_name)
              }>
            <Counter style={styles.icon_numbers_view} value={reactions} />
             </TouchableOpacity> 
          </View> 

          <View style={styles.icon_container}>
            <TouchableOpacity onPress={getAndSetShowComments}>
              <Image
                source={require('../../../assets/comentario.png')}
                style={[styles.icon_post, styles.icon_comentario]}
              />
            </TouchableOpacity>
            <Counter style={styles.icon_numbers_view} value={commentsCount} />
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
       */}
      </View>

      {/*Fin de iconos de una publicaciòn*/}

      {/*Inicio de nombre de usuario y la descripciòn de la publicaciòn*/}
      {/* <CommentFormatter
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
        /> */}
      {/*Fin de nombre de usuario y la descripciòn de la publicaciòn*/}

      {/*Inicia comentarios hacia la publicaciòn */}
      {/* {comments &&
          comments.map((comment, i) => {
            return (
              <PublicationComment
                style={styles.publicationComments}
                post={post}
                commentId={comment}
                key={i}
                navigation={navigation}
              />
            );
          })} */}

      {/* {firstTimeLoadingComments && commentsCount > 3 ? (
          <TouchableOpacity onPress={getAndSetShowComments}>
            <Text style={styles.showMoreComments}>
              {commentsCount - 3} comentario
              {commentsCount === 4 ? '' : 's'} mas...
            </Text>
          </TouchableOpacity>
        ) : null} */}

      {/*Inicia nuevo comentario hacia la publicaciòn */}
      {/* {savingComment ? (
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
          />
        )} */}
      {/*Fin de nuevo comentario hacia la publicaciòn */}

      {/*Inicia fecha*/}
      {/* <View style={styles.publicationDate}>
          <DateFormatter date={post.created_at} />
        </View> */}
      {/*Finaliza fecha */}
      {/* </View> */}
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
  upperBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    margin: 25,
  },
  ownerData: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderTopWidth: 1,
    borderTopColor: '#E8FC64',
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
