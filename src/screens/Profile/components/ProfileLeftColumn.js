import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FormButtonCount from '../../../components/FormButtonCount';
import FormButton from '../../../components/FormButton_small';

export default function ProfileLeftColumn({user, navigation, style}) {
  const go_to_followed = () => {
    navigation.navigate('Followeds', {profile: user});
  };

  const go_to_followers = () => {
    navigation.navigate('Followers', {profile: user});
  };

  return (
    <View style={style}>
      <Text style={styles.text_profile}>Publicaciones</Text>
      <FormButtonCount buttonTitle={user.posts_count.POST_TYPE_PRUEBA} />
      <Text style={styles.text_profile}>Seguidos</Text>
      <FormButtonCount
        buttonTitle={user.following_with_details.length}
        onPress={go_to_followed}
      />
      <Text style={styles.text_profile}>Seguidores</Text>
      <FormButtonCount
        buttonTitle={user.followers_with_details.length}
        onPress={go_to_followers}
      />

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
