import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';

import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

//para el flatList
const data = [
  {
    id: '0',
    Photo: '../assets/photo_perrito.png',
    icono_vist: '../assets/ojo_vista.png',
    icono_like: '../assets/corazon_like.png',
    icono_coment: '../assets/comentario.png',
    icono_compartir: '../assets/compartir.png',
  },
  {
    id: '1',
    Photo: '../assets/photo_perrito.png',
    icono_vist: '../assets/ojo_vista.png',
    icono_like: '../assets/corazon_like.png',
    icono_coment: '../assets/comentario.png',
    icono_compartir: '../assets/compartir.png',
  },
  {
    id: '2',
    Photo: '../assets/photo_perrito.png',
    icono_vist: '../assets/ojo_vista.png',
    icono_like: '../assets/corazon_like.png',
    icono_coment: '../assets/comentario.png',
    icono_compartir: '../assets/compartir.png',
  },
  {
    id: '3',
    Photo: '../assets/photo_perrito.png',
    icono_vist: '../assets/ojo_vista.png',
    icono_like: '../assets/corazon_like.png',
    icono_coment: '../assets/comentario.png',
    icono_compartir: '../assets/compartir.png',
  },
  {
    id: '4',
    Photo: '../assets/photo_perrito.png',
    icono_vist: '../assets/ojo_vista.png',
    icono_like: '../assets/corazon_like.png',
    icono_coment: '../assets/comentario.png',
    icono_compartir: '../assets/compartir.png',
  },
  {
    id: '5',
    Photo: '../assets/photo_perrito.png',
    icono_vist: '../assets/ojo_vista.png',
    icono_like: '../assets/corazon_like.png',
    icono_coment: '../assets/comentario.png',
    icono_compartir: '../assets/compartir.png',
  },
  {
    id: '6',
    Photo: '../assets/photo_perrito.png',
    icono_vist: '../assets/ojo_vista.png',
    icono_like: '../assets/corazon_like.png',
    icono_coment: '../assets/comentario.png',
    icono_compartir: '../assets/compartir.png',
  },
];
const numColumns = 3; //para el flatList
const size = Dimensions.get('window').width / numColumns; //para el flatList

let window = Dimensions.get('window');

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function Profile() {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Holaa {user.uid}</Text> */}

      <ScrollView>
        {/*---------CONTENEDOR DE SECCIONES-----------*/}
        <View style={styles.header_content}>
          <View style={styles.header_content_section}>
            <Text style={styles.Text_header_publication}>Publicaciones</Text>
            <Text style={styles.container_button_publication}>
              <Text style={styles.text_button}>2020</Text>
            </Text>

            <Text style={styles.Text_header_sponsored}>Patrocinado por:</Text>
            <Text style={styles.container_button_sponsored}>
              <Text style={styles.text_button}>@Dogchow</Text>
            </Text>
            <Text style={styles.container_button_sponsored}>
              <Text style={styles.text_button}>@Dogchow</Text>
            </Text>

            <Text style={styles.container_button_sponsored}>
              <Text style={styles.text_button}>@Dogchow</Text>
            </Text>
          </View>

          <View style={styles.header_content_section}>
            <Image
              source={require('../assets/foto_perfil_superior.png')}
              style={styles.circle_image}
            />
            <Text style={styles.Text_header_profile}>@Profile</Text>

            {/* <Text style={styles.container_button}>
            <Text style={styles.text_button}>Grabar</Text>
          </Text> */}
          </View>

          <View style={styles.header_content_section}>
            <Text style={styles.Text_header_friends}>Amigos</Text>
            <Text style={styles.container_button_friends}>
              <Text style={styles.text_button}>50</Text>
            </Text>

            <Text style={styles.Text_header_followers}>Te siguen</Text>
            <Text style={styles.container_button_followers}>
              <Text style={styles.text_button}>8350</Text>
            </Text>
            <Text style={styles.container_button_challenge}>
              <Text style={styles.text_button}>CHALLENGE</Text>
            </Text>
          </View>
        </View>
        <View style={styles.header_content_description}>
          <Text style={styles.container_button_profile_description}>
            <Text style={styles.text_button}>
              BullDog frances que vive en burzaco me gusta dormir y comer
            </Text>
          </Text>
        </View>

        <View style={styles.header_content_section}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                {/* <Text style={styles.item}>{item.value}</Text> */}

                <View style={{flexDirection: 'column',flexWrap: 'wrap',}}>
                  <Image source={require('../assets/foto_publicacion.png')} style={{width: 90, height: 90, top: 20,}}/>
                </View>

                <View style={{flexDirection: 'row',top: 25, width:90, left:6}}>
                  <Image source={require('../assets/ojo_vista.png')} style={{width: 15, height: 15}}/>
                  <Image source={require('../assets/corazon_like.png')} style={{width: 15, height: 15, right:6, left:6}}/>
                  <Image source={require('../assets/comentario.png')} style={{width: 15, height: 15, left:12}}/>
                  <Image source={require('../assets/compartir.png')} style={{width: 15, height: 15, left:18}}/>
                </View>

              </View>
            )}

            keyExtractor={(item) => item.id}
            numColumns={numColumns}
          />
        </View>
      </ScrollView>
      {/* <FormButton buttonTitle="Logout" onPress={() => logout()} /> */}
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignContent: 'center',
    alignItems: 'center',
  },

  //contenido principal del perfil
  header_content: {
    flexDirection: 'row',
    top: 15,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },

  header_content_description: {
    flexDirection: 'row',
    width: window.width,
    top: 20,
    marginBottom: 20,
  },

  //contenidos de cada secciòn
  header_content_section: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  //Titulos
  Text_header_publication: {
    color: 'white',
    marginBottom: 5,
  },

  Text_header_sponsored: {
    color: 'white',
    marginBottom: 5,
  },
  Text_header_profile: {
    color: 'white',
    color: '#E9FC64',
    marginBottom: 5,
    fontWeight: 'bold',
  },

  Text_header_friends: {
    color: 'white',
    marginBottom: 5,
  },

  Text_header_followers: {
    color: 'white',
    marginBottom: 5,
  },

  //botones
  container_button_publication: {
    //configurar button
    width: 100,
    height: 40,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#E9FC64',
    borderRadius: 20,

    //alinear lo que haya dentro del button
    textAlign: 'center',
    padding: 10,
    marginBottom: 10,
  },

  container_button_sponsored: {
    //configurar button
    width: 100,
    height: 40,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#E9FC64',
    borderRadius: 20,
    marginBottom: 10,

    //alinear lo que haya dentro del button
    textAlign: 'center',
    padding: 10,
  },

  container_button_friends: {
    //configurar button
    width: 100,
    height: 40,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#E9FC64',
    borderRadius: 20,
    marginBottom: 10,

    //alinear lo que haya dentro del button
    textAlign: 'center',
    padding: 10,
  },

  container_button_followers: {
    //configurar button
    width: 100,
    height: 40,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#E9FC64',
    borderRadius: 20,
    marginBottom: 10,

    //alinear lo que haya dentro del button
    textAlign: 'center',
    padding: 10,
  },

  container_button_challenge: {
    //configurar button
    width: 100,
    height: 40,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#E9FC64',
    borderRadius: 20,
    marginBottom: 10,

    //alinear lo que haya dentro del button
    textAlign: 'center',
    padding: 10,
  },

  container_button_profile_description: {
    //configurar button
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#E9FC64',
    borderRadius: 10,

    //alinear lo que haya dentro del button
    textAlign: 'center',
    padding: 16,
  },

  //texto dentro de cada boton
  text_button: {
    color: 'white',
  },

  circle_image: {
    width: 100,
    height: 100,
    borderRadius: 400 / 2,
    marginHorizontal: 10,
  },

  itemContainer: {
    width: size,
    height: size,
    top: 2,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 15
  },
});
