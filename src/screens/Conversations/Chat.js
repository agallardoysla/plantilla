import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import StylesConfiguration from '../../utils/StylesConfiguration';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormInputChat from '../../components/FormInputChat';
import FormButton_small from '../../components/FormButton_small';
import chats_services from '../../services/chats_services';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../../reducers/loggedUser';
import {
  addConversation,
  getConversationByParams,
  pushMessage,
  setNewConversation,
} from '../../reducers/conversations';
import Message from './components/Message';

import GoBackButton from '../../components/GoBackButton'
import { SafeAreaView } from 'react-native-safe-area-context';

const Chat = ({ navigation, route }) => {
  const user = useSelector(getLoggedUser);
  const [newMessage, setNewMessage] = useState('');
  const [other, setOther] = useState({});
  const dispatch = useDispatch();
  const receiver = route.params.receiver
    ? route.params.receiver.user_id
    : undefined;
  const conversation = useSelector(
    getConversationByParams(route.params.conversationId, receiver),
    shallowEqual,
  );

  useEffect(() => {
    console.log('conversation', conversation);
    if (route.params.conversationId) {
      setOther(getOther(conversation));
    } else {
      if (conversation.messages.length > 0) { // no hay conversaciones sin mensajes
        setOther(getOther(conversation));
      } else {
        const localConversation = {
          id: -1,
          messages: [],
          users: [route.params.receiver, user], // tiene que estar en este orden por si es una conversacion nueva
          active_users: [route.params.receiver.user_id, user.id], // tiene que estar en este orden por si es una conversacion nueva
        };
        dispatch(addConversation(localConversation));
        setOther(getOther(localConversation));
      }
    }
  }, []);

  const go_back = () => {
    navigation.goBack(null);
  };

  const getOther = (conv) => {
    const _other = conv.users.filter(u => u.user_id !== user.id);
    return _other[0] ? _other[0] : conv.users[0];
  };

  const sendNewMessage = () => {
    setNewMessage('');
    chats_services
      .sendMessage(other.user_id, { text: newMessage })
      .then((res) => {
        console.log(res.data);
        dispatch(pushMessage(res.data));
        if (!conversation.messages.length > 0) {
          chats_services.list().then((_res) => {
            dispatch(setNewConversation(_res.data[0]));
          });
        }
      });
  };

  const MessageItem = ({ item }) => (
    <Message message={item} navigation={navigation} />
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.row_header}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>

            <GoBackButton navigation={navigation} />

          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.text_title}>@{other.display_name}</Text>
          </View>
        </View>
        <FlatList
          data={conversation.messages}
          inverted={true}
          style={styles.chat}
          renderItem={MessageItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>

      <View style={styles.bottomBar}>
        <Image
          source={require('../../assets/camara.png')}
          style={{ marginLeft: 10, marginRight: 10, width: 36, height: 36 }}
        />

        <FormInputChat
          textStyle={{ color: 'white' }}
          placeholderText="Escriba un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
          onEndEditing={sendNewMessage}
        />

        <FormButton_small
          buttonTitle="ENVIAR"
          style={{
            width: 68,
            height: 40,
            backgroundColor: '#E9FC64',
            borderColor: '#E9FC64',
            marginLeft: 10,
            marginRight: 10,
          }}
          textStyle={{ color: 'black' }}
          onPress={sendNewMessage}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#242424',
    paddingVertical: 12,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  row_header: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#242424',
    paddingVertical: 12,
    marginBottom: 10,
  },

  text_title: {
    color: StylesConfiguration.color,
    // fontFamily: 'GothamBlack-Normal',
    fontSize: 18,
  },
  boton_back: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  chat: {
    marginBottom: 15,
  },
});

export default Chat;
