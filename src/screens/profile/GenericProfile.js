import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import FormButton from '../../components/FormButton';
import StylesConfiguration from '../../utils/StylesConfiguration';
import {TouchableOpacity} from 'react-native-gesture-handler';
import users_services from '../../services/users_services';
import { AuthContext } from '../../navigation/AuthProvider';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';

const numColumns = 3; //para el flatList

export default function GenericProfile({navigation, localUser, isLoggedUser}) {
  const {user} = useContext(AuthContext);
  const [usersPosts, setUsersPosts] = useState([]);
  const [followers, setFollowers] = useState(localUser.followers_with_details);
  const [showFollowMenu, setShowFollowMenu] = useState(false);

  useEffect(() => {
    users_services.listPosts(localUser.id).then((res) => {
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

  const profileFollowLoggedUser = () => localUser.following_with_details.filter((u) => u.user_id === user.id).length > 0;

  const loggedUserFollowProfile = () => user.following_with_details.filter((u) => u.user_id === localUser.id).length > 0;

  const MyProfileView = () => {
    return (
      <View View style={[styles.profileDataColumn, styles.columnRight]}>
        <Text style={styles.text_profile}>Patrocinado por:</Text>
        <FormButton
          buttonTitle="@Doggi"
          style={styles.patreon}
          textStyle={styles.patreonContent}
        />
        <FormButton
          buttonTitle="@Dogchow"
          style={styles.patreon}
          textStyle={styles.patreonContent}
        />
        <FormButton
          buttonTitle="@Pedigree"
          style={styles.patreon}
          textStyle={styles.patreonContent}
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
    const [followed, setFollowed] = useState(false);

    const doFollow = () => {
      if (followed) {
        users_services.unfollow(localUser.id).then(() => {
          console.log('dejado de seguir');
          setFollowers(followers.filter(f => f.user_id === localUser.id));
          setFollowed(false);
        });
      } else {
        users_services.follow(localUser.id).then((res) => {
          console.log('seguido', res.data);
          setFollowers([...followers, user]);
          setFollowed(true);
        });
      }
    };

    return (
      <View View style={[styles.profileDataColumn, styles.columnRight]}>
        <Text style={styles.text_profile}>Patrocinado por:</Text>
        <FormButton
          buttonTitle="@Doggi"
          style={styles.patreon}
          textStyle={styles.patreonContent}
        />
        <FormButton
          buttonTitle="@Dogchow"
          style={styles.patreon}
          textStyle={styles.patreonContent}
        />
        <FormButton
          buttonTitle="@Pedigree"
          style={styles.patreon}
          textStyle={styles.patreonContent}
        />
        <View style={styles.followInfo}>
          {profileFollowLoggedUser() ? (
            <Text style={styles.textFollowed}>Te sigue</Text>
          ) : null}
          <Menu
            opened={showFollowMenu}
            onBackdropPress={() => setShowFollowMenu(false)}>
            <MenuTrigger
              style={styles.followButton}
              onPress={() => setShowFollowMenu(true)}>
              <Text
                style={[
                  styles.menuFollowText,
                  loggedUserFollowProfile() ? {color: 'black'} : {color: 'white'},
                ]}>
                {loggedUserFollowProfile() ? 'Seguido' : 'Seguir'}
              </Text>
              <Icon
                style={styles.menuFollowIcon}
                name={'play-arrow'}
                color={loggedUserFollowProfile() ? 'black' : 'white'}
                size={24}
              />
            </MenuTrigger>
            {loggedUserFollowProfile() ? (
              <MenuOptions customStyles={menuOptions}>
                <MenuOption onSelect={doFollow} text="Dejar de seguir" />
                <MenuOption onSelect={doFollow} text="Añadir a VIP" />
                <MenuOption onSelect={doFollow} text="Bloquear" />
              </MenuOptions>
            ) : (
              <MenuOptions customStyles={menuOptions}>
                <MenuOption onSelect={doFollow} text="Seguir" />
                <MenuOption onSelect={doFollow} text="Añadir a VIP" />
                <MenuOption onSelect={doFollow} text="Bloquear" />
                <MenuOption onSelect={doFollow} text="Ocultar publicaciones" />
              </MenuOptions>
            )}
          </Menu>
        </View>
        {/* {followed ? (
          <FormButton
            buttonTitle="Pendiente"
            style={styles.followButton}
            textStyle={styles.followButtonContent}
            onPress={doFollow}
          />
        ) : (
          <FormButton
            buttonTitle="Seguir"
            style={styles.followButton}
            textStyle={styles.followButtonContent}
            onPress={doFollow}
          />
        )} */}
      </View>
    );
  };

  const goConversations = () => {
    if (isLoggedUser) {
      navigation.navigate('MyConversations');
    } else {
      console.log('otro');
      navigation.navigate('MyChat', {receiver: {user_id: localUser.id}});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileData}>
        <View style={[styles.profileDataColumn, styles.columnLeft]}>
          <Text style={styles.text_profile}>Publicaciones</Text>
          <FormButton
            buttonTitle={localUser.posts_count.POST_TYPE_PRUEBA}
            style={styles.counter}
          />
          <Text style={styles.text_profile}>Seguidos</Text>
          <FormButton
            buttonTitle={localUser.following_with_details.length}
            style={styles.counter}
            onPress={go_to_followed}
          />
          <Text style={styles.text_profile}>Seguidores</Text>
          <FormButton
            buttonTitle={followers.length}
            style={styles.counter}
            onPress={go_to_followers}
          />
          <FormButton
            buttonTitle="CHALLENGE"
            style={styles.challengeButton}
            textStyle={styles.challengeContent}
          />
        </View>
        <View style={[styles.profileDataColumn, styles.columnCenter]}>
          <View style={styles.profleFoto}>
            <Image
              source={require('../../assets/foto_perfil_superior.png')}
              style={styles.circle_image}
            />
          </View>
          <View style={styles.infoContainer}>
            {isLoggedUser ? (
              <TouchableOpacity
                style={styles.tuerca_blanca_container}
                onPress={() => navigation.navigate('Preferences')}>
                <Image
                  source={require('../../assets/tuerca_blanca.png')}
                  style={styles.tuerca_blanca}
                  resizeMode={'center'}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.tuerca_blanca_container} />
            )}
            <Text style={styles.name_user}>@{localUser.display_name}</Text>
          </View>
          <View style={styles.folowersInfo}>
            <Image source={require('../../assets/corazon_gris.png')} />
            <Text style={styles.icon_numbers}>{8}k</Text>
          </View>
          
          <TouchableOpacity onPress={goConversations}>
            <Image
              source={require('../../assets/sobre_amarillo.png')}
              style={styles.sobre_amarillo}
              resizeMode={'contain'}
            />
          </TouchableOpacity>

        </View>
        {
          //si isLoggedUser es verdadero mostrar columna con boton amigos, te siguen, CHALLENGE, y icono de sobre amarillo
          //si isLoggedUser es falso mostrar boton CHALLENGE, icono de sobre amarillo, boton seguido
          isLoggedUser ? <MyProfileView /> : <OtherProfileView />
        }
      </View>

      <Text style={styles.container_description}>
        BullDog frances que vive en burzaco me gusta dormir y comer
      </Text>

      <View style={styles.profilePublications}>
        <FlatList
          data={usersPosts}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              {item.map((post, i) => (
                <View style={styles.item} key={i}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PublicationDetails', {post})
                    }
                    style={styles.itemImageContainer}>
                    <Image
                      source={{
                        uri: post.files_with_urls[0]
                          ? post.files_with_urls[0].url
                          : '',
                      }}
                      style={styles.itemImage}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          keyExtractor={(item) => item[0].id}
        />
      </View>
    </View>
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
    paddingHorizontal: 3,
  },
  //filas division de cada secciòn
  profileData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 5,
  },

  profileDescription: {
    flex: 1,
    padding: 5,
  },
  container_description: {
    // flex: 1,
    borderWidth: 1,
    borderColor: '#E9FC64',
    borderRadius: 10,
    top: 5,
    marginBottom: 10,
    color: 'white',
    fontFamily: 'GothamBlack-normal',
    textAlign: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    minHeight: 40,
  },

  profilePublications: {
    flex: 1,
    // minHeight: 400,
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
    paddingTop: 20,
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
    minWidth: 100,
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
    marginTop: -14,
    marginBottom: 21,
    width: 105,
    borderWidth: 0.8,
    padding: 9,
  },
  patreonContent: {
    fontFamily: 'Roboto',
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
    marginRight: 3,
    width: 20,
    height: 20,
  },
  tuerca_blanca: {
    width: 20,
    height: 20,
    borderRadius: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name_user: {
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 14,
    textAlign: 'center',
    color: StylesConfiguration.color,
  },
  sobre_amarillo: {
    alignSelf: 'center',
    width: 55,
    height: 55,
  },
  challengeButton: {
    marginTop: 22,
    width: 110,
    height: 'auto',
    padding: 8,
  },
  challengeContent: {
    fontSize: 12,
  },
  vipButton: {
    marginTop: 0,
    width: 90,
    marginLeft: 11,
  },
  followInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginRight: 5,
    width: 120,
    height: 50,
  },
  vipContent: {
    fontSize: 24,
  },
  textFollowed: {
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    marginTop: -13,
  },
  followButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    borderColor: StylesConfiguration.color,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 3,
  },
  menuFollowText: {
    fontSize: 15,
    marginRight: 10,
  },
  menuFollowIcon: {
    transform: [{rotate: '90deg'}],
  },
  followButtonContent: {
    color: 'black',
  },
  profileButton: {
    marginTop: 3,
    marginBottom: 5,
    width: 115,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 120,
  },
  item: {
    flex: 1,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  itemImageContainer: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  itemImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    marginHorizontal: 1.5,
    marginVertical: 1.5,
  },
  folowersInfo: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  icon_numbers: {
    marginLeft: 4,
    color: 'white',
  },
});

const menuOptions = {
  optionsContainer: {
    backgroundColor: '#898A8D',
    padding: 5,
    borderColor: StylesConfiguration.color,
    borderWidth: 1.5,
    borderRadius: 10,
    width: 110,
    // left: 5,
  },
  optionText: {
    color: 'black',
  },
};
