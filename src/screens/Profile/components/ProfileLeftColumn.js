import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useSelector } from 'react-redux';
import FormButtonCount from '../../../components/FormButtonCount';
import FormButton from '../../../components/FormButton_small';
import { getOtherUserFolloweds, getOtherUserFollowers } from '../../../reducers/otherUser';
import { getUserFolloweds, getUserFollowers } from '../../../reducers/user';

export default function ProfileLeftColumn({user, navigation, style, isLoggedUser}) {
  const followeds = isLoggedUser
    ? useSelector(getUserFolloweds)
    : useSelector(getOtherUserFolloweds);

  const followers = isLoggedUser
    ? useSelector(getUserFollowers)
    : useSelector(getOtherUserFollowers);

  const goToFollowed = () => {
    navigation.navigate('Followeds', {isLoggedUser});
  };

  const goToFollowers = () => {
    navigation.navigate('Followers', {isLoggedUser});
  };

  return (
    <View style={style}>
      <Text style={styles.text_profile}>Publicaciones</Text>
      <FormButtonCount buttonTitle={user.posts_count ? user.posts_count.POST_TYPE_PRUEBA : 0} />
      <Text style={styles.text_profile}>Seguidos</Text>
      <FormButtonCount buttonTitle={followeds.length} onPress={goToFollowed} />
      <Text style={styles.text_profile}>Seguidores</Text>
      <FormButtonCount buttonTitle={followers.length} onPress={goToFollowers} />

      <FormButton
        buttonTitle="CHALLENGE"
        style={styles.challengeButton}
        textStyle={styles.challengeContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text_profile: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    minWidth: 100,
  },
  challengeButton: {
    marginTop: 22,
    width: 110,
    height: 35,
    padding: 8,
  },
  challengeContent: {
    fontSize: 12,
  },
});
