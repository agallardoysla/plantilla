import React, {useEffect, useState} from 'react';
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

const ProfileSearch = ({user, navigation}) => {
  
  useEffect(() => {
    chats_services.list().then(res => {
      console.log(res.data);
      console.log(res.data[0].messages);
      console.log(res.data[0].users);
      const newConversations = res.data.filter(c => c.is_active);
      setConversations(newConversations);
      setFilteredConversations(newConversations);
    });
  }, []);

  const goMyChat = () => {
    // navigation.navigate('MyChat', {itemData});
    navigation.navigate('MyChat');
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
