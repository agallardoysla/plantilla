import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import StylesConfiguration from '../../utils/StylesConfiguration';

const ProfileSearch = ({profile, navigation}) => {
  const {user} = useContext(AuthContext);
  const [userFollowProfile, setUserFollowProfile] = useState(
    user.following_with_details.filter((u) => u.user_id === profile.id).length > 0,
  );

  const goToProfile = () => {
    navigation.navigate('HomeGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: profile.id,
        navigation,
      },
    });
  };

  const goToMyChat = () => {
    navigation.navigate('HomeGroup', {
      screen: 'MyChat',
      params: {
        receiver: {
          user_id: profile.id,
          display_name: profile.display_name,
        },
      },
    });
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={goToProfile} style={styles.user}>
        <Image
          source={require('../../assets/pride-dog_1.png')}
          resizeMode="contain"
          style={styles.image}
        />

        <View style={styles.userInfo}>
          <Text style={styles.profileName}>@{profile.display_name}</Text>
          <Text style={styles.profileDescription}>Descripciòn del Perfil</Text>
        </View>
      </TouchableOpacity>
      <FormButton
        buttonTitle={userFollowProfile ? 'Dejar de seguir' : 'Seguir'}
        style={styles.followButton}
        textStyle={styles.followButtonText}
      />
      <TouchableOpacity style={styles.sobre_amarillo} onPress={goToMyChat}>
        <Image
          source={require('../../assets/sobre_amarillo.png')}
          style={styles.sobre_amarillo}
        />
      </TouchableOpacity>
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
    width: 50,
    marginTop: 0,
    padding: 5,
    marginHorizontal: 5,
    height: 35,
  },
  followButtonText: {
    fontSize: 10,
  },
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
});

export default ProfileSearch;
