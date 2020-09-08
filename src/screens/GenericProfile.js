import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import StylesConfiguration from '../utils/StylesConfiguration';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

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


export default function GenericProfile({navigation, user, isLoggedUser}) {
  const go_to_followers = () => {
    navigation.navigate('Followed');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileData}>
          <View style={[styles.profileDataColumn, styles.columnLeft]}>
            <Text style={styles.text_profile}>Publicaciones</Text>
            <FormButton
              buttonTitle={user.posts_count.POST_TYPE_PRUEBA}
              style={styles.counter}
            />
            <Text style={styles.text_profile}>Patrocinado por:</Text>
            <FormButton buttonTitle="@Doggi" style={styles.patreon} />
            <FormButton buttonTitle="@Dogchow" style={styles.patreon} />
            <FormButton buttonTitle="@Pedigree" style={styles.patreon} />
          </View>
          <View style={[styles.profileDataColumn, styles.columnCenter]}>
            <View style={styles.profleFoto}>
              {isLoggedUser ? (
                <TouchableOpacity
                  style={styles.tuerca_blanca_container}
                  onPress={() => Alert.alert("configuraciones")}
                >
                  <Image
                    source={require('../assets/tuerca_blanca.png')}
                    style={styles.tuerca_blanca}
                  />
                </TouchableOpacity>
              ) : null}
              <Image
                source={require('../assets/foto_perfil_superior.png')}
                style={styles.circle_image}
              />
            </View>
            <Text style={styles.name_user}>@{user.display_name}</Text>
            {!isLoggedUser ? (
              <Image
                source={require('../assets/sobre_amarillo.png')}
                style={styles.sobre_amarillo}
              />
            ) : null}
          </View>
          <View style={[styles.profileDataColumn, styles.columnRight]}>
            <Text style={styles.text_profile}>Amigos</Text>
            <FormButton
              buttonTitle={user.following_with_details.length}
              style={styles.counter}
              onPress={go_to_followers}
            />
            <Text style={styles.text_profile}>Te siguen</Text>
            <FormButton
              buttonTitle={user.followers_with_details.length}
              style={styles.counter}
            />
            <FormButton buttonTitle="CHALLENGE" style={styles.profileButton} />
            {isLoggedUser ? (
              <Image
                source={require('../assets/sobre_amarillo.png')}
                style={styles.sobre_amarillo_chico}
              />
            ) : (
              <FormButton buttonTitle="Seguir" style={styles.profileButton} />
            )}
          </View>
        </View>

        <View style={styles.profileDescription}>
          <Text style={styles.container_description}>
            BullDog frances que vive en burzaco me gusta dormir y comer
          </Text>
        </View>

        <View style={styles.profilePublications}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <Image
                  source={require('../assets/foto_publicacion.png')}
                  style={{width: 120, height: 120, top: 20}}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: 5,
  },
  //filas division de cada secciòn
  profileData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },

  profileDescription: {
    // flex: 1,
  },

  profilePublications: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },

  //columnas dentro de profileData

  profileDataColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  columnLeft: {
    alignItems: 'flex-start',
  },
  columnCenter: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  columnRight: {
    alignItems: 'flex-end',
  },
  text_profile: {
    fontFamily: StylesConfiguration.fontFamily,
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    marginTop: 5,
    marginBottom: 2,
  },
  counter: {
    marginTop: 0,
    marginBottom: 7,
    width: 'auto',
    minWidth: 75,
  },
  patreon: {
    marginTop: 0,
    marginBottom: 7,
    width: 105,
  },
  profleFoto: {
    marginTop: 15,
  },
  circle_image: {
    top: -30,
  },
  tuerca_blanca_container: {
    left: 100,
    top: -10,
    width: 31,
    height: 31,
  },
  tuerca_blanca: {
    width: 31,
    height: 31,
    borderRadius: 15,
  },
  name_user: {
    fontFamily: StylesConfiguration.fontFamily,
    fontWeight: '900',
    fontSize: 14,
    color: StylesConfiguration.color,
    marginTop: 10,
    marginBottom: 20,
  },
  sobre_amarillo: {
    width: 55,
    height: 55,
    marginVertical: 10,
  },
  sobre_amarillo_chico: {
    width: 35,
    height: 35,
  },
  profileButton: {
    marginTop: 3,
    marginBottom: 5,
    width: 115,
  },
  container_description: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E9FC64',
    borderRadius: 10,
    top: 5,
    marginBottom: 10,
    color: 'white',
    fontFamily: 'GothamBlack-normal',
    textAlign: 'center',
    paddingVertical: 15,
  },

  itemContainer: {
    top: 2,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent:'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
