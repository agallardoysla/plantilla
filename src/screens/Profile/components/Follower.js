import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {batch, useDispatch, useSelector} from 'react-redux';
import FormButton from '../../../components/FormButton';
import { followOtherUser, unfollowOtherUser } from '../../../reducers/otherUser';
import {getLoggedUser, followUser, unfollowUser} from '../../../reducers/loggedUser';
import users_services from '../../../services/users_services';
import StylesConfiguration from '../../../utils/StylesConfiguration';


const Follower = ({follower, navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(getLoggedUser);
  const [userFollowProfile, setUserFollowProfile] = useState(
    user.following_with_details.filter((u) => u.user_id === follower.user_id).length > 0,
  );

  const goToProfile = () => {
    navigation.navigate('OtherProfileGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: follower.user_id,
      },
    });
  };

  const goToChat = () => {
    navigation.navigate('MyConversationsGroup', {
      screen: 'Chat',
      params: {
        receiver: {
          user_id: follower.user_id,
          display_name: follower.display_name,
        },
      },
    });
  };

  const doFollow = () => {
    if (userFollowProfile) {
      batch(() => {
        dispatch(unfollowUser(follower));
        // dispatch(unfollowOtherUser(user));
      });
      users_services.cancelFollow(follower.user_id);
    } else {
      batch(() => {
        dispatch(followUser(follower));
        // dispatch(followOtherUser(user));
      });
      users_services.follow(follower.user_id);
    }
    setUserFollowProfile(!userFollowProfile);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={goToProfile} style={styles.user}>
        <Image
          source={
            follower.profile && follower.profile.photo
              ? {uri: follower.profile.photo.url_small}
              : require('../../../assets/foto_perfil_superior.png')
          }
          style={styles.image}
          resizeMode="cover"
          fadeDuration={0}
        />
        <Text style={styles.profileName} numberOfLines={2}>
          @{follower.display_name}
        </Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.sobre_amarillo} onPress={goToChat}>
          <Image
            source={require('../../../assets/sobre_amarillo.png')}
            style={styles.sobre_amarillo}
          />
        </TouchableOpacity>
        <FormButton
          buttonTitle={userFollowProfile ? 'Seguido' : 'Seguir'}
          style={[styles.followButton, userFollowProfile ? styles.followedButton : {}]}
          textStyle={[styles.followButtonText, userFollowProfile ? styles.followedButtonText: {}]}
          onPress={doFollow}
        />
        <FormButton
          buttonTitle={'...'}
          style={styles.followButton}
          textStyle={styles.followButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  user: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileName: {
    color: 'white',
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 15,
    width: 115,
    marginLeft: 5,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  followButton: {
    width: 55,
    marginTop: 0,
    padding: 2,
    marginHorizontal: 5,
    height: 26,
    borderRadius: 5,
  },
  followButtonText: {
    fontSize: 10,
    color: StylesConfiguration.color,
  },
  followedButton: {
    backgroundColor: StylesConfiguration.color,
  },
  followedButtonText: {
    color: 'black',
  },
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
});

export default Follower;
