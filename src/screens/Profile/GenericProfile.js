import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import FormButtonPatreon from '../../components/FormButtonPatreon';
import FormButtonVip from '../../components/FormButtonVip';
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
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from '../../components/Icon';
import FormLike from '../../components/FormLike';
import ProfileLeftColumn from './components/ProfileLeftColumn';
import ProfileRightColumn from './components/ProfileRightColumn';

const numColumns = 3; //para el flatList
const windowWidth = Dimensions.get('window').width;

export default function GenericProfile({navigation, localUser, isLoggedUser}) {
  const {user, followUser, unfollowUser} = useContext(AuthContext);
  const [usersPosts, setUsersPosts] = useState([]);
  const [followers, setFollowers] = useState(localUser.followers_with_details);
  const [followeds, setFolloweds] = useState(localUser.following_with_details);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.profileData}>
        <ProfileLeftColumn
          style={[styles.profileDataColumn, styles.columnLeft]}
          user={localUser}
          navigation={navigation}
        />
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
        <ProfileRightColumn
          style={[styles.profileDataColumn, styles.columnRight]}
          user={localUser}
          isLoggedUser={isLoggedUser}
        />
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
});
