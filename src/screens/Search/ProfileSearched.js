import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import StylesConfiguration from '../../utils/StylesConfiguration';
import users_services from '../../services/users_services';

let window = Dimensions.get('window');

const ProfileSearch = ({user}) => {

  const [FollowedUser, setFollowedUser] = useState(user.followers_with_details.filter((u) => u.user_id === myId).length > 0);
  
  //seguir usuario
  const goFollower = () => {

    if (FollowedUser) {
      users_services.unfollow(user.id).then(() => {
        setFollowedUser(false);
        console.log('dejado de seguir');
      });
    } else {
      users_services.follow(user.id).then(() => {
        setFollowedUser(true);
        console.log('seguido');
      });
    }
  };

  return (
    <View style={styles.row}>
      <View style={{flexDirection: 'column', top: 10}}>
        <Image
          source={require('../../assets/pride-dog_1.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={{flex: 1, flexDirection: 'column', top: 10}}>
        <TouchableOpacity onPress={goMyChat}>
          <Text style={styles.text}>@{user.display_name}</Text>
          <Text style={{color: 'white', marginLeft: 5,}}>Descripciòn del Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: 'black',
    marginBottom: 10,
  },
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
  boton_back: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  text_title_profile: {
    fontFamily: StylesConfiguration.fontFamily,
    color: 'white',
  },
  text_description: {
    fontFamily: 'GothamBlack-Normal',
    color: 'white',
    marginHorizontal: 10,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 10,
    borderRadius: 400 / 2,
  },
});

export default ProfileSearch;
