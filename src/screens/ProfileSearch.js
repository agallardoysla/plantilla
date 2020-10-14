import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import StylesConfiguration from '../utils/StylesConfiguration';
import FormButton_small from '../components/FormButton_small';
import Icon from '../components/Icon';
import users_services from '../services/users_services';

let window = Dimensions.get('window');

const ProfileSearch = ({item, key, myId}) => {
  const [FollowedUser, setFollowedUser] = useState(
    item.followers_with_details.filter((u) => u.user_id === myId).length > 0,
  );

  //seguir usuario
  const goFollower = () => {
    if (FollowedUser) {
      users_services.unfollow(item.id).then(() => {
        setFollowedUser(false);
        console.log('dejado de seguir');
      });
    } else {
      users_services.follow(item.id).then(() => {
        setFollowedUser(true);
        console.log('seguido');
      });
    }
  };

  return (
    <View style={{flexDirection: 'row'}} key={key}>
      <View style={styles.column}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/pride-dog_1.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.row_content}>
            <View style={{flexDirection: 'column', top: -5}}>
              <Text style={styles.text}>@{item.display_name}</Text>
              <Text style={{color: 'white', marginLeft: 5}}>
                Descripciòn del Perfil
              </Text>
            </View>
          </View>
        </View>
      </View>

      <FormButton_small
        buttonTitle={FollowedUser ? 'Pendiente' : 'Seguir'}
        style={{top: 5, width: 68, height: 40, marginRight: 5, marginLeft: 5}}
        onPress={goFollower}
      />

      <Icon source={'email'} size={46} color={StylesConfiguration.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontFamily: StylesConfiguration.fontFamily,
    color: StylesConfiguration.color,
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  boton_back: {
    marginHorizontal: 10,
    marginVertical: 10,
  },

  column: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  row_content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 400 / 2,
  },
  text: {
    fontFamily: StylesConfiguration.fontFamily,
    color: 'white',
    marginLeft: 5,
  },
});

export default ProfileSearch;
