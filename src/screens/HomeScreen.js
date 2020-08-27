import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

const window = Dimensions.get('window');

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function HomeScreen() {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.encabezado_text}>@User</Text>
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
          <Text style={{color: 'white', left: -15}}>5645</Text>

          <Image
            source={require('../assets/corazon_like.png')}
            style={styles.icon_publication}
          />
          <Text style={{color: 'white', left: -15}}>5645</Text>

          <Image
            source={require('../assets/comentario.png')}
            style={styles.icon_publication}
          />

          <Image
            source={require('../assets/compartir.png')}
            style={styles.icon_publication}
          />
        </View>

        <View
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
        <Text style={styles.encabezado_text}>@User</Text>

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
          <Text style={{color: 'white', left: -15}}>5645</Text>

          <Image
            source={require('../assets/corazon_like.png')}
            style={styles.icon_publication}
          />
          <Text style={{color: 'white', left: -15}}>5645</Text>

          <Image
            source={require('../assets/comentario.png')}
            style={styles.icon_publication}
          />

          <Image
            source={require('../assets/compartir.png')}
            style={styles.icon_publication}
          />
        </View>

        {/* <Text style={styles.text}>Holaa {user.uid}</Text> */}
        {/* <FormButton buttonTitle="Logout" onPress={() => logout()} /> */}
      </ScrollView>
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
