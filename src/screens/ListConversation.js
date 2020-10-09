import React, { useContext } from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { AuthContext } from '../navigation/AuthProvider';
import StylesConfiguration from '../utils/StylesConfiguration';

const ListConversation = ({conversation, navigation}) => {
  const {user} = useContext(AuthContext);
  //MyConversations > ListConversation(FlatList) > MyChat
  const goMyChat = () => {
    navigation.navigate('MyChat', {conversation});
  };

  const getProfileName = () => {
    const other = conversation.users.filter(u => u.user_id !== user.id);
    console.log('other', other);
    return other[0] ? other[0].display_name : conversation.users[0].display_name;
  };

  const getLastMessage = () => conversation.messages[0];

  const getLastMessageText = () => {
    return getLastMessage().text;
  };

  const getLastMessageSender = () => {
    return getLastMessage().from === user.id ? 'Yo' : `@${getProfileName()}`;
  };

  return (
    <View style={styles.row}>
      <View style={{flexDirection: 'column', top: 10}}>
        <Image
          source={require('../assets/pride-dog_1.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={{flex: 1, flexDirection: 'column', top: 10}}>
        <TouchableOpacity onPress={goMyChat}>
          <Text style={styles.text_title_profile}>@{getProfileName()}</Text>
          <Text style={styles.text_description}>
            <Text style={styles.text_title_profile}>{getLastMessageSender()}: </Text>
            {getLastMessageText()}
          </Text>
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

export default ListConversation;
