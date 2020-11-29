import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import ProgressiveImage from '../../../components/ProgressiveImage';
import {getLoggedUser} from '../../../redux/reducers/session';
import MessageFormatter from './MessageFormatter';

export default function Message({message, navigation}) {
  const loggedUser = useSelector(getLoggedUser);

  const iSendIt = (_message) =>
    _message.from === loggedUser.id ||
    (_message.from.user_id && _message.from.user_id === loggedUser.id); // hablar con Alberto por este problema

  return  (
    <View style={iSendIt(message) ? styles.row_chat_me : styles.row_chat_third}>
      <Image
        source={require('../../../assets/pride-dog_1.png')}
        resizeMode="contain"
        style={styles.image}
        fadeDuration={0}
     />
      <MessageFormatter
        style={styles.text_chat}
        message={message.text}
        navigation={navigation}
      />
    </View>
  )
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
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
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
    borderRadius: 50 / 2,
    top: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});
