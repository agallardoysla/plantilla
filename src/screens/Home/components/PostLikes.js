import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FormButton_small from '../../../components/FormButton_small';
import FormSearchInput from '../../../components/FormSearchInput';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import Icon from '../../../components/Icon';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProgressiveImage from '../../../components/ProgressiveImage';
import PublicationContent from './PublicationContent';
import {useSelector} from 'react-redux';

const PostLikes = ({navigation, route}) => {
  const {reactions_details, files_with_urls, reactionscount} = route.params;
  const [search, setSearch] = useState({
    reactions: reactions_details,
    searchTerms: '',
  });
  const followers = useSelector(
    (state) => state.session.user.followers_with_details,
  );

  const getFollowLikeRatio = () => {
    let follower = 0;
    let other = 0;

    reactions_details.map((reaction) => {
      const followerReacted = followers.some((follower) => {
        return follower.user_id === reaction.user_id;
      });
      if (followerReacted) {
        follower++;
      } else {
        other++;
      }
    });
    return {follower, other};
  };

  const reactionsBy = getFollowLikeRatio();

  const showPublication = () => {
    navigation.navigate('Home');
  };

  const UserCard = ({item}) => {
    const {photo, username} = item;

    return (
      <View style={styles.row}>
        <View style={styles.contentViewIcon}>
          <ProgressiveImage
            thumbnailSource={require('../../../assets/pride-dog_1.png')}
            source={
              photo !== null
                ? {uri: photo}
                : require('../../../assets/pride-dog_1.png')
            }
            resizeMode="cover"
            style={styles.image}
          />
          <View style={styles.contentView}>
            <Text
              style={{
                color: 'white',
                fontWeight: StylesConfiguration.fontWeight,
                fontFamily: StylesConfiguration.fontFamily,
                left: 5,
              }}>
              {username}
            </Text>
            <Text
              style={{
                color: 'white',
                // fontFamily: 'GothamBlack-Normal',
                left: 5,
              }}>
              #QuedateEnCasa
            </Text>
          </View>
        </View>

        <View style={styles.contentViewAction}>
          {/* <Image
            source={require('../../../assets/icono_home.png')}
            resizeMode="contain"
            style={styles.image_icon}
          /> */}
          <View style={styles.contentView}>
            <Icon
              source={'email'}
              color={StylesConfiguration.color}
              size={32}
              style={{margin: 4}}
            />
          </View>
        </View>
      </View>
    );
  };

  const filterUsers = (searchTerms) => {
    console.log('search.reactions', search.reactions);
    if (searchTerms !== '') {
      const filtered = search.reactions.filter((user) =>
        user.username.toLowerCase().includes(searchTerms.toLowerCase()),
      );
      return filtered;
    } else return reactions_details;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.column_back}>
        <TouchableOpacity onPress={showPublication}>
          <Image
            style={styles.boton_back}
            source={require('../../../assets/boton_volver_atras.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.sub_colummn}>
            <Text
              style={{
                color: 'white',
                // fontFamily: 'GothamBlack-normal'
              }}>
              Seguidores
            </Text>
            <Text
              style={{
                color: 'white',
                // fontFamily: 'GothamBlack-normal',
                top: 20,
              }}>
              Otros
            </Text>
          </View>

          <View style={styles.sub_colummn}>
            <View style={styles.reactionByFollowerContainer}>
              <Text style={styles.reactionByFollower_text}>
                {reactionsBy.follower}{' '}
              </Text>
            </View>
            <View style={styles.reactionByOtherContainer}>
              <Text style={styles.reactionByOther_text}>
                {reactionsBy.other}
              </Text>
            </View>
          </View>

          <View style={styles.sub_colummn}>
            <Icon source={'favorite'} color="red" size={32} />
            <Text
              style={{
                color: 'white',
                // fontFamily: 'GothamBlack-normal'
              }}>
              {reactionscount}
            </Text>
          </View>

          <View style={styles.sub_colummn}>
            {/* <Image source={require('../../../assets/dog.png')} /> */}
            <PublicationContent
              files={files_with_urls}
              showFullContent={true}
              style={styles.image_post}
              navigation={navigation}
            />
          </View>
        </View>

        <View style={styles.row}>
          <FormSearchInput
            value={search.searchTerms}
            placeholderText={'Buscar usuarios...'}
            onChange={(e) =>
              setSearch({reactions: filterUsers(e), searchTerms: e})
            }
          />
        </View>

        <FlatList data={search.reactions} renderItem={UserCard} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  column_back: {
    flexDirection: 'column',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    marginBottom: 5,
    top: 5,
  },
  row_comment: {
    flexDirection: 'column',
    flex: 1,
    flexWrap: 'wrap',
  },
  boton_back: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  sub_colummn: {
    flex: 1,
    alignItems: 'center',
  },
  reactionByFollowerContainer: {
    width: 100,
    backgroundColor: '#E8FC64',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    alignContent: 'center',
  },
  reactionByOtherContainer: {
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#E8FC64',
    alignItems: 'center',
    alignContent: 'center',
  },
  reactionByOther_text: {
    color: 'white',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 400 / 2,
  },

  image_icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    borderRadius: 400 / 2,
  },

  contentView: {
    flexDirection: 'column',
  },
  contentViewIcon: {
    flexDirection: 'row',
    top: 10,
  },
  contentViewAction: {
    flexDirection: 'row',
    marginLeft: 10,
    top: 10,
  },
  style_mensaje_hashtag: {
    color: 'blue',
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
  },
  style_mensaje_publicacion: {
    color: 'white',
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
    left: 10,
  },

  style_mensaje_respuesta: {
    color: 'white',
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
    left: 10,
  },
});

export default PostLikes;
