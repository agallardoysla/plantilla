import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Counter from '../../../components/Counter';
import FormLike from '../../../components/FormLike';
import { addOtherUserReaction, getOtherUserReactions, removeOtherUserReaction } from '../../../reducers/otherUser';
import { getLoggedUser, getLoggedUserReactions } from '../../../reducers/loggedUser';
import profiles_services from '../../../services/profiles_services';
import StylesConfiguration from '../../../utils/StylesConfiguration';

export default function ProfileCenterColumn({user, navigation, style, isLoggedUser}) {
  const userReactions = isLoggedUser
    ? useSelector(getLoggedUserReactions)
    : useSelector(getOtherUserReactions);
  const loggedUser = useSelector(getLoggedUser);
  const dispatch = useDispatch();

  const getILiked = () => {
    console.log(isLoggedUser, userReactions);
    return isLoggedUser || userReactions.filter((item) => item.user === loggedUser.id).length >= 1;
  };

  const getLikesCounter = () => {
    return userReactions ? userReactions.length : 0;
  };

  const addReactions = () => {
    try {
      if (getILiked()) {
        profiles_services.deleteReaction(user.id);
        dispatch(removeOtherUserReaction({user: loggedUser.id}));
      } else {
        profiles_services.addReaction(user.id, {reaction_type: 2});
        dispatch(addOtherUserReaction({user: loggedUser.id}));
      }
    } catch (error) {
      console.log('Error de agregar like' + error);
    }
  };

  const goConversations = () => {
    if (isLoggedUser) {
      navigation.navigate('MyConversationsGroup', {
        screen: 'MyConversations',
      });
    } else {
      navigation.navigate('MyConversationsGroup', {
        screen: 'Chat',
        params: {
          receiver: {
            user_id: user.id,
            display_name: user.display_name,
          },
        },
      });
    }
  };

  const getProfilePhoto = () => {
    return user.profile.photo
      ? {uri: user.profile.photo.url_half}
      : require('../../../assets/foto_perfil_superior.png');
  };

  const goToVerify = () => {
    navigation.navigate('VerifyAccountText');
  };

  return (
    <View style={style}>
      <View style={styles.profleFoto}>
        <Image
          source={getProfilePhoto()}
          style={styles.circle_image}
          fadeDuration={0}
        />
      </View>

      <View style={styles.infoContainer}>
        {isLoggedUser ? (
          <TouchableOpacity
            style={styles.tuerca_blanca_container}
            onPress={() => navigation.navigate('Preferences')}>
            <Image
              source={require('../../../assets/tuerca_blanca.png')}
              style={styles.tuerca_blanca}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.tuerca_blanca_container} />
        )}
        <Text style={styles.name_user} numberOfLines={1}>
          @{user.display_name}
        </Text>
      </View>

      <TouchableOpacity onPress={addReactions} disabled={isLoggedUser}>
        <View style={styles.folowersInfo}>
          <FormLike iLiked={getILiked()} />
          <Counter value={getLikesCounter()} style={styles.icon_numbers} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goConversations}>
        <Image
          source={require('../../../assets/sobre_amarillo.png')}
          style={styles.sobre_amarillo}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToVerify}>
        <Image
          source={require('../../../assets/sobre_amarillo.png')}
          style={styles.sobre_amarillo}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
  },
  profleFoto: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  circle_image: {
    height: 110,
    width: 110,
    borderRadius: 55,
  },
  tuerca_blanca_container: {
    marginLeft: 40,
    marginRight: 3,
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
    color: StylesConfiguration.color,
    paddingRight: 45,
  },
  sobre_amarillo: {
    alignSelf: 'center',
    width: 55,
    height: 55,
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
