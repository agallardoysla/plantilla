import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from '../../../components/Icon';
import StylesConfiguration from '../../../utils/StylesConfiguration';

export default function FollowMenu({user}) {
  const [loggedUserFollowProfile, setLoggedUserFollowProfile] = useState(
    user.following_with_details.filter((u) => u.user_id === user.id).length > 0,
  );
  const [showFollowMenu, setShowFollowMenu] = useState(false);

  const doFollow = () => {
    if (loggedUserFollowProfile) {
    //   users_services.cancelFollow(user.id);
    //   const newFollowers = followers.filter((f) => f.user_id !== user.id);
    //   setFollowers(newFollowers);
    //   user.followers_with_details = newFollowers;
    //   unfollowUser({user_id: user.id});
    // } else {
    //   users_services.follow(user.id);
    //   const newFollowers = [
    //     ...followers,
    //     {user_id: user.id, display_name: user.display_name},
    //   ];
    //   setFollowers(newFollowers);
    //   user.followers_with_details = newFollowers;
    //   followUser({
    //     user_id: user.id,
    //     display_name: user.display_name,
    //   });
    }
    setLoggedUserFollowProfile(!loggedUserFollowProfile);
  };

  return (
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
  );
};

const styles = StyleSheet.create({
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
