import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { batch, useDispatch } from 'react-redux';
import FormButton from '../../../components/FormButton';
import { unfollowUser } from '../../../reducers/loggedUser';
import users_services from '../../../services/users_services';
import StylesConfiguration from '../../../utils/StylesConfiguration';

const Followed = ({ followed, navigation, isLoggedUser }) => {
  const dispatch = useDispatch();

  const goToProfile = () => {
    navigation.navigate('OtherProfileGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: followed.user_id,
      },
    });
  };

  const goToChat = () => {
    navigation.navigate('MyConversationsGroup', {
      screen: 'Chat',
      params: {
        receiver: {
          user_id: followed.user_id,
          display_name: followed.display_name,
        },
      },
    });
  };

  const doUnfollowUser = () => {
    batch(() => {
      // No hace falta actualizar el otro perfil porque cuando se visita se carga la info
      dispatch(unfollowUser(followed));
      // dispatch(unfollowOtherUser(user));
    });
    users_services.cancelFollow(followed.user_id);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={goToProfile} style={styles.user}>
        <Image
          source={
            followed.profile && followed.profile.photo
              ? {uri: followed.profile.photo.url_small}
              : require('../../../assets/foto_perfil_superior.png')
          }
          style={styles.image}
          resizeMode="cover"
          fadeDuration={0}
        />
        <Text style={styles.profileName} numberOfLines={2}>
          @{followed.display_name}
        </Text>
      </TouchableOpacity>
      {isLoggedUser ? (
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
            onPress={doUnfollowUser}
          />
          <FormButton
            buttonTitle={'Bloquear'}
            style={styles.followButton}
            textStyle={styles.followButtonText}
          />
        </View>
      ) : (
        <View style={styles.actions} />
      )}
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
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
});

export default Followed;
