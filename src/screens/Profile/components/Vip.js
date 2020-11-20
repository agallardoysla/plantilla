import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {batch, useDispatch, useSelector} from 'react-redux';
import FormButton from '../../../components/FormButton';
import { followOtherUser, unfollowOtherUser } from '../../../reducers/otherUser';
import {getLoggedUser, followUser, unfollowUser} from '../../../reducers/loggedUser';
import users_services from '../../../services/users_services';
import StylesConfiguration from '../../../utils/StylesConfiguration';


const Vip = ({vip, navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(getLoggedUser);

  const goToProfile = () => {
    navigation.navigate('OtherProfileGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: vip.user_id,
      },
    });
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={goToProfile} style={styles.user}>
        <Image
          source={
            vip.profile && vip.profile.photo
              ? {uri: vip.profile.photo.url_small}
              : require('../../../assets/foto_perfil_superior.png')
          }
          style={styles.image}
          resizeMode="cover"
          fadeDuration={0}
        />
        <Text style={styles.profileName} numberOfLines={2}>
          @{vip.display_name}
        </Text>
      </TouchableOpacity>
      <View style={styles.actions}>
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

export default Vip;
