import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import FormButton from '../components/FormButton';
import StylesConfiguration from '../utils/StylesConfiguration';
import {TouchableOpacity} from 'react-native-gesture-handler';
import users_services from '../services/users_services';

const numColumns = 3; //para el flatList

export default function GenericProfile({navigation, user, isLoggedUser}) {
  const [usersPosts, setUsersPosts] = useState([]);

  useEffect(() => {
    users_services.listPosts(user.id).then((res) => {
      let postsPaginated = [];
      // Se paginan los post de acuerdo a la cantidad de columnas
      res.data.forEach((p, i) => {
        // si se llega a (i % numColumns === 0) se agrega una nueva pagina
        if (i % numColumns === 0) {
          postsPaginated.push([]);
        }
        // siempre se agregan los posts en la ultima fila que se agrego
        postsPaginated[postsPaginated.length - 1].push(p);
      });
      setUsersPosts(postsPaginated);
    });
  }, []);

  const go_to_followed = () => {
    navigation.navigate('Followed');
  };

  const go_to_followers = () => {
    navigation.navigate('Followers');
  };

  const MyProfileView = () => {
    return (
      <View View style={[styles.profileDataColumn, styles.columnRight]}>
        <FormButton
          buttonTitle="CHALLENGE"
          style={styles.challengeButton}
          textStyle={styles.challengeContent}
        />
        <FormButton
          buttonTitle="V.I.P."
          style={styles.vipButton}
          textStyle={styles.vipContent}
        />
      </View>
    );
  };

  const OtherProfileView = () => {
    return (
      <View View style={[styles.profileDataColumn, styles.columnRight]}>
        <FormButton buttonTitle="CHALLENGE" style={styles.challengeButton} />
        <FormButton buttonTitle="CHALLENGE" style={styles.profileButton} />
        <Image
          source={require('../assets/sobre_amarillo.png')}
          style={styles.sobre_amarillo_chico}
        />
        <FormButton buttonTitle="Seguir" style={styles.profileButton} />
      </View>
    );
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
            <Text style={styles.text_profile}>Seguidos</Text>
            <FormButton
              buttonTitle={user.following_with_details.length}
              style={styles.counter}
              onPress={go_to_followed}
            />
            <Text style={styles.text_profile}>Seguidores</Text>
            <FormButton
              buttonTitle={user.followers_with_details.length}
              style={styles.counter}
              onPress={go_to_followers}
            />
            {/* <Text style={styles.text_profile}>Patrocinado por:</Text>
            <FormButton buttonTitle="@Doggi" style={styles.patreon} />
            <FormButton buttonTitle="@Dogchow" style={styles.patreon} />
            <FormButton buttonTitle="@Pedigree" style={styles.patreon} /> */}
          </View>
          <View style={[styles.profileDataColumn, styles.columnCenter]}>
            <View style={styles.profleFoto}>
              {isLoggedUser ? (
                <TouchableOpacity
                  style={styles.tuerca_blanca_container}
                  onPress={() => Alert.alert('configuraciones')}>
                  <Image
                    source={require('../assets/tuerca_blanca.png')}
                    style={styles.tuerca_blanca}
                    resizeMode={'center'}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.tuerca_blanca_container} />
              )}
              <Image
                source={require('../assets/foto_perfil_superior.png')}
                style={styles.circle_image}
              />
            </View>
            <Text style={styles.name_user}>@{user.display_name}</Text>
            {isLoggedUser ? (
              <Image
                source={require('../assets/sobre_amarillo.png')}
                style={styles.sobre_amarillo}
              />
            ) : (
              <>
                <Image source={require('../assets/corazon_gris.png')} />
                <Text style={styles.icon_numbers}>{8}k</Text>
              </>
            )}
          </View>
          {
            //si isLoggedUser es verdadero mostrar columna con boton amigos, te siguen, CHALLENGE, y icono de sobre amarillo
            //si isLoggedUser es falso mostrar boton CHALLENGE, icono de sobre amarillo, boton seguido
            isLoggedUser ? <MyProfileView /> : <OtherProfileView />
          }
        </View>

        <View style={styles.profileDescription}>
          <Text style={styles.container_description}>
            BullDog frances que vive en burzaco me gusta dormir y comer
          </Text>
        </View>

        <View style={styles.profilePublications}>
          <FlatList
            data={usersPosts}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                {item.map((post, i) => (
                  <Image
                    source={{uri: post.files_with_urls[0].url}}
                    style={styles.itemImage}
                    key={i}
                  />
                ))}
              </View>
            )}
            keyExtractor={(item) => item[0].id}
          />
        </View>
      </View>
    </ScrollView>
  );
}

// define el ancho relativo de las columnas del perfil
const columns = [3, 7];

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
    marginHorizontal: 20,
  },

  profilePublications: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'stretch',
  },

  //columnas dentro de profileData

  profileDataColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  columnLeft: {
    flex: columns[0],
    alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
  columnCenter: {
    flex: columns[1],
    alignItems: 'stretch',
    // backgroundColor: 'white',
  },
  columnRight: {
    flex: columns[0],
    alignItems: 'flex-end',
    // backgroundColor: 'blue',
  },
  text_profile: {
    // fontFamily: StylesConfiguration.fontFamily,
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    marginTop: 3,
    marginBottom: 2,
  },
  counter: {
    marginTop: 0,
    marginBottom: 0,
    width: 'auto',
    height: 'auto',
    minWidth: 75,
    borderWidth: 0.5,
    padding: 9,
  },
  patreon: {
    marginTop: 0,
    marginBottom: 7,
    width: 105,
  },
  profleFoto: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  circle_image: {
    // top: -30,
  },
  tuerca_blanca_container: {
    marginLeft: 90,
    top: 20,
    width: 20,
    height: 20,
  },
  tuerca_blanca: {
    width: 20,
    height: 20,
    borderRadius: 15,
  },
  name_user: {
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 14,
    textAlign: 'center',
    color: StylesConfiguration.color,
    marginTop: 10,
  },
  sobre_amarillo: {
    alignSelf: 'center',
    width: 55,
    height: 55,
    marginTop: 5,
  },
  sobre_amarillo_chico: {
    width: 35,
    height: 35,
  },
  challengeButton: {
    marginTop: 22,
    width: 110,
  },
  challengeContent: {
    fontSize: 12,
  },
  vipButton: {
    marginTop: 80,
    width: 90,
    marginLeft: 11,
  },
  vipContent: {
    fontSize: 24,
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
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 120,
  },
  itemImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    marginHorizontal: 1.5,
    marginVertical: 1.5,
  },
});
