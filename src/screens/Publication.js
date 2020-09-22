import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Video from 'react-native-video';
// import { HashtagFormatter } from '../utils/HashtagFormatter';
import StylesConfiguration from '../utils/StylesConfiguration';
import ParsedText from 'react-native-parsed-text';
import comments_services from '../services/comments_services';
import posts_services from '../services/posts_services';
import PublicationsComments from './PublicationsComments';
import {AuthContext} from '../navigation/AuthProvider';

let window = Dimensions.get('window');

export default function Publication({item, navigation}) {
  return <PublicationRepresentation post={item} navigation={navigation} />;
}

const PublicationRepresentation = ({post, navigation}) => {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [firstTimeLoadingComments, setFirstTimeLoadingComments] = useState(
    true,
  );
  const [comments, setComments] = useState(post.comments);

  const [savingComment, setSavingComment] = useState(false);
  const {user} = useContext(AuthContext);

  const [CountLike, setCountLike] = useState({
    REACTION_TYPE_PRUEBA: post.reactionscount.REACTION_TYPE_PRUEBA,
  });

  const availableImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const isImage = (uri) =>
    availableImageExtensions.reduce((r, ext) => r || uri.includes(ext), false);

  const toView = (file, i) => {
    // console.log(file, i);
    return isImage(file.url) ? (
      <Image
        source={{uri: file.url}}
        style={styles.image_post}
        key={i}
        resizeMode="cover"
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

  const renderText = (matchingString, matches) => {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[(@[^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  };

  const saveComment = async () => {
    setSavingComment(true);
    const comment = {
      post: post.id,
      text: newComment,
      user_owner: user,
    };
    setNewComment('');
    await comments_services.create(comment);
    setComments([...comments, comment]);
    setSavingComment(false);
    getAndSetShowComments();
  };

  const getAndSetShowComments = () => {
    if (!firstTimeLoadingComments) {
      setShowComments(!showComments);
      console.log('get comments', showComments, loadingComments);
    } else {
      setFirstTimeLoadingComments(false);
    }
    setLoadingComments(true);
    if (showComments) {
      posts_services.getComments(post.id).then((res) => {
        setComments(res.data);
        setLoadingComments(false);
      });
    } else {
      setLoadingComments(false);
      setShowComments(!showComments);
    }
  };

  const AddLike = async () => {
    try {
      //seteo a vacio
      setCountLike('');

      //traigo el post seleccionado
      const selectPost = await posts_services.get(post.id);

      //filtro mi id dentro de la lista de likes y almaceno mis datos en filterLikePost en caso de estar
      const filterLikePost = selectPost.data.reactions_details.filter(
        (value) => value.user_id === user.id,
      );

      //si contiene algo lo elimino si no lo agrego
      if (filterLikePost.length > 0) {
        posts_services.deleteReaction(post.id);
        console.log('like eliminado');
      } else {
        posts_services.addReaction(post.id, 1);
        console.log('like agregado');
      }

      //traigo nuevamenta el post seleccionado
      const count = await posts_services.get(post.id);
      //seteo con nuevo valor
      setCountLike({
        REACTION_TYPE_PRUEBA: count.data.reactionscount.REACTION_TYPE_PRUEBA,
      });
    } catch (error) {
      console.log('Error de agregar like' + error);
    }
  };

  return (
    <View style={styles.container}>
      {/*Inicia Nombre de usuario como encabezado*/}
      <Text style={styles.encabezado_text}>
        @{post.user_owner.display_name}
      </Text>
      {/*Finaliza Nombre de usuario como encabezado*/}

      {/*Inicia Foto de la publicaciòn */}
      {post.files_with_urls.length > 0 ? (
        <View style={styles.postImagesContainer}>
          <ScrollView horizontal={true} indicatorStyle="white">
            {post.files_with_urls.map(toView)}
          </ScrollView>
        </View>
      ) : null}
      {/*Finaliza Foto de la publicaciòn*/}

      {/*Inicio de iconos de la publicaciòn*/}
      <View style={styles.icon_container}>
        <Image
          source={require('../assets/ojo_vista.png')}
          style={[styles.icon_post, styles.icon_ojo]}
        />
        <Text style={styles.icon_numbers}>{post.views_count}</Text>

        <TouchableOpacity
          onPress={() =>
            //dar likes
            AddLike()
          }>
          <Image
            source={
              CountLike.REACTION_TYPE_PRUEBA >= 1
                ? require('../assets/corazon_limon.png')
                : require('../assets/corazon_gris.png')
            }
            style={[styles.icon_post, styles.icon_corazon]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PostLikes', post.user_owner.display_name)
          }>
          <Text style={styles.icon_numbers}>
            {CountLike.REACTION_TYPE_PRUEBA}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={getAndSetShowComments}>
          <Image
            source={require('../assets/comentario.png')}
            style={[styles.icon_post, styles.icon_comentario]}
          />
        </TouchableOpacity>

        <Image
          source={require('../assets/compartir.png')}
          style={[styles.icon_post, styles.icon_compartir]}
        />

        <Image
          source={require('../assets/menu_desbordamiento.png')}
          style={[styles.icon_post, styles.icon_mostrarMas]}
        />
      </View>
      {/*Fin de iconos de una publicaciòn*/}

      {/*Inicio de nombre de usuario y la descripciòn de la publicaciòn*/}
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: '#E8FC64',
            marginHorizontal: 10,
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          {post.user_owner.display_name}
        </Text>
        <Text style={{color: 'white', alignItems: 'stretch', marginBottom: 10}}>
          {post.text === '__post_text__' ? '' : post.text}
        </Text>
      </View>
      {/*Fin de nombre de usuario y la descripciòn de la publicaciòn*/}

      {/*Inicia comentarios hacia la publicaciòn */}
      {showComments ? (
        loadingComments ? (
          <ActivityIndicator color={StylesConfiguration.color} />
        ) : (
          comments.map((comment, i) => (
            <PublicationsComments
              style={styles.publicationComments}
              postId={post.id}
              comment={comment}
              key={i}
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
        <TextInput
          style={styles.newComment}
          onChangeText={setNewComment}
          onSubmitEditing={saveComment}
          placeholder={'Escribir un nuevo comentario...'}
          placeholderTextColor={'white'}>
          {newComment}
        </TextInput>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'black',
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  encabezado_text: {
    textAlign: 'right',
    color: 'white',
    fontWeight: 'bold',
  },
  postImagesContainer: {
    flex: 1,
    height: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  image_post: {
    width: window.width - 20,
    height: 300,
  },
  icon_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon_post: {
    marginRight: 10,
  },
  icon_ojo: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  icon_corazon: {
    width: 20,
    height: 18,
    marginRight: 5,
  },
  icon_comentario: {
    width: 30,
    height: 30,
  },
  icon_compartir: {
    width: 23,
    height: 23,
  },
  icon_mostrarMas: {
    width: 33,
    height: 10,
  },
  icon_numbers: {
    color: 'white',
    marginRight: 15,
  },
  icon_menu_desbordamiento: {
    top: 5,
    left: -5,
  },
  publicationComments: {
    flex: 1,
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
    marginTop: 10,
  },
});
