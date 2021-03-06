import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FormButton from '../../../components/FormButton';
import users_services from '../../../services/users_services';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import {getLoggedUser, followUser, unfollowUser} from '../../../reducers/loggedUser';

const ProfileSearched = ({profile, navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(getLoggedUser);
  const [userFollowProfile, setUserFollowProfile] = useState(
    user.following_with_details.filter((u) => u.user_id === profile.id).length > 0,
  );

  const goToProfile = () => {
    navigation.navigate('OtherProfileGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: profile.id,
      },
    });
  };

  const goToChat = () => {
    navigation.navigate('MyConversationsGroup', {
      screen: 'Chat',
      params: {
        receiver: {
          user_id: profile.id,
          display_name: profile.display_name,
        },
      },
    });
  };

  const doFollow = () => {
    if (userFollowProfile) {
      users_services.cancelFollow(profile.id);
      dispatch(unfollowUser({user_id: profile.id}));
    } else {
      users_services.follow(profile.id);
      dispatch(followUser({...profile, user_id: profile.id}));
    }
    setUserFollowProfile(!userFollowProfile);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={goToProfile} style={styles.user}>
        <Image
          source={require('../../../assets/pride-dog_1.png')}
          resizeMode="contain"
          style={styles.image}
        />

        <View style={styles.userInfo}>
          <Text style={styles.profileName} numberOfLines={1}>
            @{profile.display_name}
          </Text>
          <Text style={styles.profileDescription} numberOfLines={1}>
            Descripciòn del Perfil
          </Text>
        </View>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
    width: 115,
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
  },
  profileDescription: {
    color: 'white',
    fontSize: 13,
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

export default ProfileSearched;
