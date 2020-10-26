import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FormButton from '../../../components/FormButton';
import StylesConfiguration from '../../../utils/StylesConfiguration';


const Followed = ({follower, navigation}) => {

  const goToProfile = () => {
    navigation.navigate('HomeGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: follower.user_id,
        navigation,
      },
    });
  };

  const goToChat = () => {
    navigation.navigate('Chat', {
      receiver: {
        user_id: follower.user_id,
        display_name: follower.display_name,
      },
    });
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={goToProfile} style={styles.user}>
        <Image
          source={require('../../../assets/pride-dog_1.png')}
          resizeMode="contain"
          style={styles.image}
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
          buttonTitle={'Borrar'}
          style={styles.followButton}
          textStyle={styles.followButtonText}
        />
        <FormButton
          buttonTitle={'Bloquear'}
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
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
});

export default Followed;
