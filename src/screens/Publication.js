import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import StylesConfiguration from '../utils/StylesConfiguration';
import posts_services from '../services/posts_services';
import PublicationsComments from './PublicationsComments';
import CommentInput from '../utils/CommentInput';
import {AuthContext} from '../navigation/AuthProvider';
import CommentFormatter from '../utils/CommentFormatter';

let window = Dimensions.get('window');

export default function Publication({post, navigation}) {
  const [showComments, setShowComments] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [firstTimeLoadingComments, setFirstTimeLoadingComments] = useState(
    true,
  );
  const [comments, setComments] = useState(post.comments);
  const [savingComment, setSavingComment] = useState(false);
  const {user} = useContext(AuthContext);
  const [likesCounter, setLikesCounter] = useState(
    post.reactionscount.REACTION_TYPE_PRUEBA,
  );
  const [iLiked, setILiked] = useState(
    post.reactions_details.filter((value) => value.user_id === user.id).length >
      0,
  );
  const [countComments, setCountComments] = useState(post.comments.length);

  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  const toView = (file, i) => {
    // console.log(file, i);
    return isImage(file.url) ? (
      <Image
        source={{uri: file.url}}
        style={[styles.image_post, i >= 1 ? {marginLeft: 10} : {}]}
        key={i}
        resizeMode="contain"
      />
    ) : (
      <Video
        source={{uri: file.url}}
        style={styles.image_post}
        key={i}
        controls={true}
        fullscreen={false}
      />
    );
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
    //   posts_services.getComments(post.id).then((res) => {
    //     setComments(res.data);
    //     setLoadingComments(false);
    //   });
    // } else {
    //   setLoadingComments(false);
    //   setShowComments(true);
    // }
  };

  const newCommentCallback = (comment) => {
    setComments([...comments, comment]);
    setSavingComment(false);
    // getAndSetShowComments();
  };

  const AddLike = async () => {
    try {
      //si contiene algo lo elimino si no lo agrego
      if (iLiked) {
        posts_services.deleteReaction(post.id).then((_) => {
          console.log('like eliminado');
          setLikesCounter(likesCounter - 1);
          setILiked(false);
        });
      } else {
        posts_services.addReaction(post.id, 1).then((res) => {
          console.log('like agregado');
          setLikesCounter(likesCounter + 1);
          setILiked(true);
        });
      }
    } catch (error) {
      console.log('Error de agregar like' + error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row_header}>
          <Image
            source={require('../assets/sobre_amarillo.png')}
            style={styles.sobre_amarillo}
            resizeMode={'contain'}
          />
        </View>

        {/*Inicia Nombre de usuario, foto, verificacion de cuenta*/}

        <View style={{flexDirection: 'row'}}>
          {post.user_owner.account_verified ? (
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Image source={require('../assets/tilde.png')} />
            </View>
          ) : null}
          <View
            style={{
              flexDirection: 'column',
              flex: post.user_owner.account_verified ? 0 : 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Text style={styles.encabezado_text}>
              {' '}
              @{post.user_owner.display_name}{' '}
            </Text>
          </View>

          <View style={{flexDirection: 'column'}}>
            <Image
              source={require('../assets/pride-dog_1.png')}
              resizeMode="contain"
              style={styles.image_profile}
            />
          </View>
        </View>
        {/* <Text style={styles.encabezado_text}>
          @{post.user_owner.display_name}
          <Image
            source={require('../assets/pride-dog_1.png')}
            resizeMode="contain"
            style={styles.image_profile}
          />
          
        </Text> */}
        {/*Finaliza Nombre de usuario como encabezado*/}

        {/*Inicia Foto de la publicaciòn */}
        {post.files_with_urls.length > 0 ? (
          <View style={styles.postImagesContainer}>
            <TouchableOpacity
              style={styles.postImagesContainerPresable}
              onPress={() => navigation.navigate('PublicationDetails', {post})}>
              <ScrollView horizontal={true} indicatorStyle="white">
                {post.files_with_urls.map(toView)}
              </ScrollView>
            </TouchableOpacity>
          </View>
        ) : null}
        {/*Finaliza Foto de la publicaciòn*/}

        {/*Inicio de iconos de la publicaciòn*/}
        <View style={styles.icon_container}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/ojo_vista.png')}
              style={[styles.icon_post, styles.icon_ojo]}
            />
            <Text style={styles.icon_numbers_view}>{post.views_count}</Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={AddLike}>
              <Image
                source={
                  iLiked
                    ? require('../assets/corazon_limon.png')
                    : require('../assets/corazon_gris.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PostLikes', post.user_owner.display_name)
              }>
              <Text style={styles.icon_numbers_like}>{likesCounter}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={getAndSetShowComments}>
              <Image
                source={require('../assets/comentario.png')}
                style={[styles.icon_post, styles.icon_comentario]}
              />
            </TouchableOpacity>

            <Text style={styles.icon_numbers_comment}>{countComments}</Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/compartir.png')}
              style={[styles.icon_post, styles.icon_compartir]}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/menu_desbordamiento.png')}
              style={[styles.icon_post, styles.icon_mostrarMas]}
            />
          </View>
        </View>
        {/*Fin de iconos de una publicaciòn*/}

        {/*Inicio de nombre de usuario y la descripciòn de la publicaciòn*/}
        <CommentFormatter
          style={styles.description}
          comment={
            '[' +
            post.user_owner.display_name +
            '] ' +
            (post.text === '__post_text__' ? '' : post.text)
          }
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
                setComments={setComments}
                navigation={navigation}
                setCountComments={setCountComments}
                countComments={countComments}
              />
            ))
          )
        ) : null}

        {firstTimeLoadingComments && post.comments.length > 3 ? (
          <TouchableOpacity onPress={getAndSetShowComments}>
            <Text
              style={{
                color: 'gray',
                marginBottom: 10,
                left: 10,
                textAlign: 'left',
              }}>
              {post.comments.length - 3} comentario
              {post.comments.length == 4 ? '' : 's'} mas...
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
        <Text
          style={{
            textAlign: 'right',
            color: 'gray',
            marginBottom: 10,
            right: 10,
          }}>
          Ayer a las 23:40
        </Text>
        {/*Finaliza fecha */}

        {/*Inicia franja amarilla */}
        {/* <View
        style={{
          flex: 1,
          height: 70,
          backgroundColor: 'yellow',
        }}>
        <Image
          style={{
            alignContent: 'center',
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          source={require('../assets/franja_amarilla_imagen.png')}
          resizeMode="center"
        />
      </View> */}
        {/*Finaliza franja amarilla */}
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
    height: 360,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
  image_post: {
    width: window.width - 10,
    height: 360,
  },
  icon_container: {
    justifyContent: 'center',
    // flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
  icon_numbers_view: {
    color: 'white',
    fontSize: 14,
    top: 3,
    marginHorizontal: -5,
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
    borderRadius: 400 / 2,
    marginRight: 14,
    marginBottom: 5,
  },
});
