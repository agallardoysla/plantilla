import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import posts_services from '../services/posts_services';
import View_Publication from './view_publication';

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
        renderItem={View_Publication}
        onEndReachedThreshold={0.5}
        onEndReached={(info) => loadPost()}
        bouncesZoom={true}
      />
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
});
