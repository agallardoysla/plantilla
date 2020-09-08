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
import StylesConfiguration from '../utils/StylesConfiguration';
import {Icon} from 'react-native-elements';

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
export default function Profile({navigation}) {
  const {user, logout} = useContext(AuthContext);
  
  const go_to_followers = () => {
    navigation.navigate("Followed")
  }
  return (
    <ScrollView>
      <View>
        <View style={styles.container_row_1}>
          <View style={styles.column_row_1}>
            <Text style={styles.text_profile}>Publicaciones</Text>
            <FormButton buttonTitle="2020" />
            <Text style={styles.text_profile}>Patrocinado por:</Text>
            <FormButton buttonTitle="@Doggi" />
            <FormButton buttonTitle="@Dogchow" />
            <FormButton buttonTitle="@Pedigree" />
          </View>
          <View style={styles.column_row_1}>
            <Image
              source={require('../assets/foto_perfil_superior.png')}
              style={styles.circle_image}
            />
            <Text style={styles.name_user}>@Brownie</Text>
            <Icon name="email" color={StylesConfiguration.color} size={48} />
          </View>
          <View style={styles.column_row_1}>
            <Text style={styles.text_profile} >Amigos</Text>
            <FormButton buttonTitle="500" onPress={go_to_followers} />
            <Text style={styles.text_profile}>Te siguen</Text>
            <FormButton buttonTitle="8350"  />
            <FormButton buttonTitle="CHALLENGE" />
            <FormButton buttonTitle="Seguir" />
          </View>
        </View>

        <View style={styles.container_row_2}>
          <Text style={styles.container_description}>
            BullDog frances que vive en burzaco me gusta dormir y comer
          </Text>
        </View>
        <View style={styles.container_row_3}>
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
  //filas division de cada secciòn
  container_row_1: {
    flex: 2.5,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },

  container_row_2: {
    flex: 1,
    backgroundColor: 'black',
  },

  container_row_3: {
    flex: 1,
    backgroundColor: 'black',
    alignContent: 'center',
    alignItems: 'center',
  },

  //columnas dentro de las filas
  column_row_1: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 10,
  },

  text_profile: {
    fontFamily: 'GothamBlack-normal',
    fontWeight: '900',
    fontSize: 14,
    color: 'white',
    top: 10,
  },
  name_user: {
    fontFamily: StylesConfiguration.fontFamily,
    fontWeight: '900',
    fontSize: 14,
    color: StylesConfiguration.color,
    paddingBottom: 10,
    top: 10,
  },

  container_description: {
    flex: 1,
    backgroundColor: 'black',
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
