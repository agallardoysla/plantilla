import React, { useContext } from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { AuthContext } from '../../navigation/AuthProvider';
import StylesConfiguration from '../../utils/StylesConfiguration';

const ListConversation = ({conversation, navigation}) => {
  const {user} = useContext(AuthContext);
  //MyConversations > ListConversation(FlatList) > MyChat
  const goMyChat = () => {
    navigation.navigate('MyChat', {conversation});
  };

  const getOther = () => {
    const other = conversation.users.filter(u => u.user_id !== user.id);
    return other[0] ? other[0] : conversation.users[0];
  };

  const getProfileName = () => {
    return getOther().display_name;
  };

  const getLastMessage = () => conversation.messages[0];

  const getLastMessageText = () => {
    return getLastMessage() ? getLastMessage().text : '';
  };

  const getLastMessageSender = () => {
    return getLastMessage()
      ? getLastMessage().from === user.id
        ? 'Yo'
        : `@${getProfileName()}`
      : '';
  };

  return (
    <View style={styles.row}>
      <Image
        source={require('../../assets/pride-dog_1.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <TouchableOpacity onPress={goMyChat}>
        <View style={styles.description}>
          <Text style={styles.text_title_profile} numberOfLines={1}>
            @{getProfileName()}
          </Text>
          <Text style={styles.text_description} numberOfLines={1}>
            <Text style={styles.text_title_profile}>
              {getLastMessageSender()}:{' '}
            </Text>
            {getLastMessageText()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  description: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
    bottom: 5,
  },
  text_title_profile: {
    fontFamily: StylesConfiguration.fontFamily,
    color: 'white',
  },
  text_description: {
    fontFamily: StylesConfiguration.fontFamily,
    color: 'white',
    marginHorizontal: 10,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
});

export default ListConversation;
