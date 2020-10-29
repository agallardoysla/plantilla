import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import FollowMenu from './FollowMenu';

export default function OtherProfileRightColumn({user}) {
  const profileFollowLoggedUser = user.following_with_details.filter((u) => u.user_id === user.id).length > 0;

  return (
    <View style={styles.followInfo}>
      {profileFollowLoggedUser ? (
        <Text style={styles.textFollowed}>Te sigue</Text>
      ) : (
        <Text style={styles.textFollowed} /> // funciona de placeholder
      )}
      <FollowMenu user={user} />
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
});
