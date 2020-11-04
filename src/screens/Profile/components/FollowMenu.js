import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from '../../../components/Icon';
import StylesConfiguration from '../../../utils/StylesConfiguration';

export default function FollowMenu({user, loggedUserFollowProfile}) {
  const [showFollowMenu, setShowFollowMenu] = useState(false);

  const doAction = () => {};

  return (
    <Menu
      opened={showFollowMenu}
      onBackdropPress={() => setShowFollowMenu(false)}>
      <MenuTrigger
        style={styles.openMenuButton}
        onPress={() => setShowFollowMenu(true)}>
        <Icon
          style={styles.menuFollowIcon}
          source={'play_arrow'}
          color={loggedUserFollowProfile ? 'black' : 'white'}
          size={24}
          onPress={() => setShowFollowMenu(true)}
        />
      </MenuTrigger>
      {loggedUserFollowProfile ? (
        <MenuOptions customStyles={menuOptions(loggedUserFollowProfile)}>
          <MenuOption onSelect={doAction} text="Dejar de seguir" />
          <MenuOption onSelect={doAction} text="Añadir a VIP" />
          <MenuOption onSelect={doAction} text="Bloquear" />
        </MenuOptions>
      ) : (
        <MenuOptions customStyles={menuOptions(loggedUserFollowProfile)}>
          <MenuOption onSelect={doAction} text="Añadir a VIP" />
          <MenuOption onSelect={doAction} text="Bloquear" />
          <MenuOption onSelect={doAction} text="Ocultar publicaciones" />
        </MenuOptions>
      )}
    </Menu>
  );
};

const styles = StyleSheet.create({
  openMenuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuFollowIcon: {
    transform: [{rotate: '90deg'}],
  },
});

const menuOptions = (loggedUserFollowProfile) => {
  const borderWidth = 1.5;
  const borderColor = StylesConfiguration.color;
  return {
    optionsContainer: {
      backgroundColor: '#898A8D',
      // padding: 5,
      borderLeftColor: borderColor,
      borderRightColor: borderColor,
      borderBottomColor: borderColor,
      borderLeftWidth: borderWidth,
      borderRightWidth: borderWidth,
      borderBottomWidth: borderWidth,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      width: 110,
      marginLeft: loggedUserFollowProfile ? 2.5 : 8.5,
      marginTop: 30,
    },
    optionText: {
      color: 'black',
    },
  };
};
