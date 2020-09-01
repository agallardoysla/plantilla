import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import ImagePicker from 'react-native-image-picker';
import posts_services from '../services/posts_services';

const window = Dimensions.get('window');

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function HomeScreen() {
  const {user, logout} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (posts.length === 0) {
      loadPost();
    }
  });

  const loadPost = () => {
    posts_services.list().then((res) => {
      console.log("nuevos posts", res.data);
      setPosts(res.data);
    });
  };

  const Post = ({item}) => {
    console.log(item);
    return (
      <View>
        <Text style={styles.encabezado_text}>@{item.user_owner.username}</Text>
        <Image
          source={require('../assets/foto_publicacion.png')}
          resizeMode="cover"
          style={styles.image_publication}
        />

        <View style={styles.icon_container}>
          <Image
            source={require('../assets/ojo_vista.png')}
            style={styles.icon_publication}
          />
          <Text style={{color: 'white', left: -15}}>{item.reactionscount.TIPO_REACCION_PRUEBA}</Text>

          <Image
            source={require('../assets/corazon_like.png')}
            style={styles.icon_publication}
          />
          <Text style={{color: 'white', left: -15}}>{item.commentscount}</Text>

          <Image
            source={require('../assets/comentario.png')}
            style={styles.icon_publication}
          />

          <Image
            source={require('../assets/compartir.png')}
            style={styles.icon_publication}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={Post}
        onEndReachedThreshold={0.5}
        onEndReached={(info) => loadPost()}
        bouncesZoom={true}
      />
      {/* <View
        style={{
          width: window.width,
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
          resizeMode='center'
        />
      </View>
        */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
  icon_container: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between', //espacio o separacion entre elementos
  },
  icon_publication: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  image_publication: {
    width: window.width,
    height: 300,
    alignContent: 'center',
    marginBottom: 5,
  },
});
