import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import users_services from '../../../services/users_services';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileLeftColumn from './ProfileLeftColumn';
import ProfileRightColumn from './ProfileRightColumn';
import ProfileCenterColumn from './ProfileCenterColumn';
import { useSelector } from 'react-redux';
import { getLoggedUser } from '../../../reducers/loggedUser';
import { getOtherUser } from '../../../reducers/otherUser';

const numColumns = 3; //para el flatList

export default function GenericProfile({ navigation, isLoggedUser }) {
  const localUser = isLoggedUser
    ? useSelector(getLoggedUser)
    : useSelector(getOtherUser);
  const [usersPosts, setUsersPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = () => {
    setLoading(true)
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
        setLoading(false)
      });
      setUsersPosts(postsPaginated);
    });
  };

  const goToPost = (post) => () => {
    navigation.navigate('PostGroup', {
      screen: 'PublicationDetails',
      params: {
        post,
      },
    });
  };

  const UserPostItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.map((post, i) => (
        <View style={styles.item} key={i}>
          <TouchableOpacity
            onPress={goToPost(post)}
            style={styles.itemImageContainer}>
            <Image
              source={{
                uri: post.files_with_urls[0].url_half ? post.files_with_urls[0].url_half : post.files_with_urls[0].url,
              }}
              style={styles.itemImage}
              fadeDuration={0}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileData}>
        <ProfileLeftColumn
          style={[styles.profileDataColumn, styles.columnLeft]}
          user={localUser}
          navigation={navigation}
          isLoggedUser={isLoggedUser}
        />
        <ProfileCenterColumn
          style={[styles.profileDataColumn, styles.columnCenter]}
          user={localUser}
          navigation={navigation}
          isLoggedUser={isLoggedUser}
        />
        <ProfileRightColumn
          style={[styles.profileDataColumn, styles.columnRight]}
          user={localUser}
          isLoggedUser={isLoggedUser}
          navigation={navigation}
        />
      </View>

      <Text style={styles.container_description}>
        {localUser.profile.bio === '__profile__bio__'
          ? 'BullDog frances que vive en burzaco me gusta dormir y comer'
          : localUser.profile.bio}
      </Text>

      <View style={styles.profilePublications}>
        <FlatList
          onRefresh={loadPost}
          refreshing={loading}
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
});
