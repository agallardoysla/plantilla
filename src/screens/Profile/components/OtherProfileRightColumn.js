import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StylesConfiguration, { baseToast } from '../../../utils/StylesConfiguration';
import FollowMenu from './FollowMenu';
import {batch, useDispatch, useSelector} from 'react-redux';
import {followUser, getLoggedUser, unfollowUser} from '../../../reducers/loggedUser';
import users_services from '../../../services/users_services';
import { followOtherUser, unfollowOtherUser } from '../../../reducers/otherUser';
import Toast from 'react-native-toast-message';

export default function OtherProfileRightColumn({user}) {
  const loggedUser = useSelector(getLoggedUser);
  const profileFollowLoggedUser = user.following_with_details.filter((u) => u.user_id === loggedUser.id).length > 0;
  const [loggedUserFollowProfile, setLoggedUserFollowProfile] = useState(
    loggedUser.following_with_details.filter((u) => u.user_id === user.id).length > 0,
  );
  const dispatch = useDispatch();

  const doFollow = () => {
    if (loggedUserFollowProfile) {
      batch(() => {
        dispatch(unfollowUser({user_id: user.id}));
        dispatch(unfollowOtherUser(loggedUser));
      });
      users_services.cancelFollow(user.id);
      Toast.show(
        baseToast({text1: `Dejaste de seguir a ${user.display_name}`}),
      );
    } else {
      batch(() => {
        dispatch(followUser({...user, user_id: user.id}));
        dispatch(followOtherUser(loggedUser));
      });
      users_services.follow(user.id);
      Toast.show(
        baseToast({text1: `Comenzaste a seguir a ${user.display_name}`}),
      );
    }
    setLoggedUserFollowProfile(!loggedUserFollowProfile);
  };

  return (
    <View style={styles.followInfo}>
      {profileFollowLoggedUser ? (
        <Text style={styles.textFollowed}>Te sigue</Text>
      ) : (
        <Text style={styles.textFollowed} /> // funciona de placeholder
      )}
      <View 
        style={[
          styles.followButton,
          loggedUserFollowProfile ? styles.followedButton : {},
        ]}
        >
        <TouchableOpacity
          onPress={doFollow}>
          <Text
            style={[
              styles.followText,
              loggedUserFollowProfile ? {color: 'black'} : {color: 'white'},
            ]}>
            {loggedUserFollowProfile ? 'Seguido' : 'Seguir'}
          </Text>
        </TouchableOpacity>
          <FollowMenu
            user={user}
            loggedUserFollowProfile={loggedUserFollowProfile}
          />
      </View>
    </View>
  );

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
};

const styles = StyleSheet.create({
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
    height: 40,
  },
  followText: {
    fontSize: 15,
    marginLeft: 10,
  },
  followedButton: {
    backgroundColor: StylesConfiguration.color,
  },
  followedText: {
    color: 'black',
  },
});
