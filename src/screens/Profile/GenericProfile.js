import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';

import FormButtonPatreon from '../../components/FormButtonPatreon';
import FormButtonVip from '../../components/FormButtonVip';
import FormButton from '../../components/FormButton';
import FormButtonCount from '../../components/FormButtonCount';
import FormImageIcon from '../../components/FormImageIcon';

import StylesConfiguration from '../../utils/StylesConfiguration';
import {TouchableOpacity} from 'react-native-gesture-handler';
import users_services from '../../services/users_services';
import profileLikes from '../../services/profiles_services';
import {AuthContext} from '../../navigation/AuthProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from '../../components/Icon';
import FormLike from '../../components/FormLike';

const numColumns = 3; //para el flatList
const windowWidth = Dimensions.get('window').width;

export default function GenericProfile({navigation, localUser, isLoggedUser}) {
  const {user, followUser, unfollowUser} = useContext(AuthContext);
  const [usersPosts, setUsersPosts] = useState([]);
  const [followers, setFollowers] = useState(localUser.followers_with_details);
  const [followeds, setFolloweds] = useState(localUser.following_with_details);
  const [profileFollowLoggedUser, setProfileFollowLoggedUser] = useState(
    localUser.following_with_details.filter((u) => u.user_id === user.id)
      .length > 0,
  );
  const [loggedUserFollowProfile, setLoggedUserFollowProfile] = useState(
    user.following_with_details.filter((u) => u.user_id === localUser.id)
      .length > 0,
  );
  const [showFollowMenu, setShowFollowMenu] = useState(false);
  const [iLiked, setILiked] = useState(false);

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
    profileLikes
      .getReactions()
      .then((res) =>
        setILiked(
          res.data.filter((item) => item.user === localUser.id).length >= 1,
        ),
      );
  }, []);

  const go_to_followed = () => {
    navigation.navigate('Followeds', {profile: localUser});
  };

  const go_to_followers = () => {
    navigation.navigate('Followers', {profile: localUser});
  };

  const dataPatreon = [
    {
      id: 1,
      name: '@Doggi',
    },
    {
      id: 2,
      name: '@Dogchow',
    },
    {
      id: 3,
      name: '@Pedigree',
    },
  ];

  const MyProfileView = () => {
    return (
      <View View style={[styles.profileDataColumn, styles.columnRight]}>
        <Text style={styles.textPatreon}>Patrocinado por:</Text>

        {dataPatreon.map((item, key) => {
          return <FormButtonPatreon buttonTitle={item.name} />;
        })}
        <FormButtonVip buttonTitle="V.I.P." />
      </View>
    );
  };

  const OtherProfileView = () => {
    const doFollow = () => {
      if (loggedUserFollowProfile) {
        users_services.cancelFollow(localUser.id);
        const newFollowers = followers.filter((f) => f.user_id !== user.id);
        setFollowers(newFollowers);
        localUser.followers_with_details = newFollowers;
        unfollowUser({user_id: localUser.id});
      } else {
        users_services.follow(localUser.id);
        const newFollowers = [
          ...followers,
          {user_id: user.id, display_name: user.display_name},
        ];
        setFollowers(newFollowers);
        localUser.followers_with_details = newFollowers;
        followUser({
          user_id: localUser.id,
          display_name: localUser.display_name,
        });
      }
      setLoggedUserFollowProfile(!loggedUserFollowProfile);
    };

    return (
      <View View style={[styles.profileDataColumn, styles.columnRight]}>
        <Text style={styles.textPatreon}>Patrocinado por:</Text>

        {dataPatreon.map((item, key) => {
          return <FormButtonPatreon buttonTitle={item.name} />;
        })}

        <View style={styles.followInfo}>
          {profileFollowLoggedUser ? (
            <Text style={styles.textFollowed}>Te sigue</Text>
          ) : (
            <Text style={styles.textFollowed} /> // funciona de placeholder
          )}
          <Menu
            opened={showFollowMenu}
            onBackdropPress={() => setShowFollowMenu(false)}>
            <MenuTrigger
              style={[
                styles.followButton,
                loggedUserFollowProfile ? styles.followedButton : {},
              ]}
              onPress={() => setShowFollowMenu(true)}>
              <Text
                style={[
                  styles.followText,
                  loggedUserFollowProfile ? {color: 'black'} : {color: 'white'},
                ]}>
                {loggedUserFollowProfile ? 'Seguido' : 'Seguir'}
              </Text>
              <Icon
                style={styles.menuFollowIcon}
                source={'play_arrow'}
                color={loggedUserFollowProfile ? 'black' : 'white'}
                size={24}
              />
            </MenuTrigger>
            {loggedUserFollowProfile ? (
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
      navigation.navigate('Chat', {
        receiver: {user_id: localUser.id, display_name: localUser.display_name},
      });
    }
  };

  const UserPostItem = ({item}) => (
    <View style={styles.itemContainer}>
      {item.map((post, i) => (
        <View style={styles.item} key={i}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PublicationDetails', {post})}
            style={styles.itemImageContainer}>
            <Image
              source={{
                uri: post.files_with_urls[0] ? post.files_with_urls[0].url : '',
              }}
              style={styles.itemImage}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const addReactions = () => {
    try {
      //si contiene algo lo elimino si no lo agrego
      if (iLiked) {
        profileLikes.deleteReactions(localUser.id).then((res) => {
          console.log('like eliminado');
          // setLikesCounter(likesCounter + 1);
        });
      } else {
        profileLikes.addReactions(localUser.id, 2).then((res) => {
          console.log('like agregado');
          // setLikesCounter(likesCounter + 1);
        });
      }
      setILiked(!iLiked);
    } catch (error) {
      console.log('Error de agregar like' + error);
    }
  };

  return (
    <MenuProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileData}>
          <View style={[styles.profileDataColumn, styles.columnLeft]}>
            <Text style={styles.text_profile}>Publicaciones</Text>
            <FormButtonCount
              buttonTitle={localUser.posts_count.POST_TYPE_PRUEBA}
            />
            <Text style={styles.text_profile}>Seguidos</Text>
            <FormButtonCount
              buttonTitle={followeds.length}
              onPress={go_to_followed}
            />
            <Text style={styles.text_profile}>Seguidores</Text>
            <FormButtonCount
              buttonTitle={followers.length}
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
              <FormImageIcon
                size={24}
                source={require('../../assets/foto_perfil_superior.png')}
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

            <TouchableOpacity onPress={addReactions}>
              <View style={styles.folowersInfo}>
                <FormLike iLiked={iLiked} />
                <Text style={styles.icon_numbers}>{8}k</Text>
              </View>
            </TouchableOpacity>

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
          {localUser.profile.bio === '__profile__bio__'
            ? 'BullDog frances que vive en burzaco me gusta dormir y comer'
            : localUser.profile.bio}
        </Text>

        <View style={styles.profilePublications}>
          <FlatList
            data={usersPosts}
            renderItem={UserPostItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    </MenuProvider>
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
    // fontFamily: 'GothamBlack-normal',
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
    justifyContent: 'flex-start',
  },
  columnLeft: {
    flex: columns[0],
    alignItems: 'flex-start',
    // // backgroundColor: 'red',
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
    minWidth: 100,
  },

  profleFoto: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
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
    height: 35,
    padding: 8,
  },
  challengeContent: {
    fontSize: 12,
  },
  followInfo: {
    alignSelf: 'flex-end',
    bottom: -7,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 120,
    height: 50,
  },
  textFollowed: {
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
  },
  textPatreon: {
    color: 'white',
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
    height: 35,
  },
  followText: {
    fontSize: 15,
    marginRight: 10,
  },
  followedButton: {
    backgroundColor: StylesConfiguration.color,
  },
  followedText: {
    color: 'black',
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
  icon_numbers: {
    marginLeft: 4,
    color: 'white',
  },
  folowersInfo: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  textPatreon: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    minWidth: 100,
    fontWeight: 'bold',
  },
});

const menuOptions = {
  optionsContainer: {
    backgroundColor: '#898A8D',
    // padding: 5,
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
