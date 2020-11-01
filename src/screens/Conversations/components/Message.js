import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getUser} from '../../../reducers/user';
import MessageFormatter from './MessageFormatter';

export default function Message({message, navigation}) {
  const user = useSelector(getUser);

  const iSendIt = (_message) =>
    _message.from === user.id ||
    (_message.from.user_id && _message.from.user_id === user.id); // hablar con Alberto por este problema

  return iSendIt(message) ? (
    <View style={styles.row_chat_me}>
      <MessageFormatter
        style={styles.text_chat}
        message={message.text}
        navigation={navigation}
      />
      <Image
        source={require('../../../assets/pride-dog_1.png')}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  ) : (
    <View style={styles.row_chat_third}>
      <Image
        source={require('../../../assets/pride-dog_1.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <MessageFormatter
        style={styles.text_chat}
        message={message.text}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  //tercero
  row_chat_third: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  //yo
  row_chat_me: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  text_chat: {
    // fontFamily: 'GothamBlack-Normal',
    color: 'white',
    top: 38,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 400 / 2,
    top: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});
