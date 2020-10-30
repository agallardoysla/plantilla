import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import StylesConfiguration from '../../utils/StylesConfiguration';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FormInputChat from '../../components/FormInputChat';
import FormButton_small from '../../components/FormButton_small';
import chats_services from '../../services/chats_services';
import MessageFormatter from './components/MessageFormatter';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../reducers/user';
import {addConversation, getConversationByParams, pushMessage} from '../../reducers/conversations';

const Chat = ({navigation, route}) => {
  const user = useSelector(getUser);
  const [newMessage, setNewMessage] = useState('');
  const [other, setOther] = useState({});
  const dispatch = useDispatch();
  const conversation = useSelector(
    getConversationByParams(
      route.params.conversationId,
      route.params.receiver ? route.params.receiver.user_id : null,
    ),
  );

  useEffect(() => {
    if (route.params.conversationId) {
      setOther(getOther(conversation));
    } else {
      if (conversation) {
        setOther(getOther(conversation));
      } else {
        const localConversation = {
          messages: [],
          users: [route.params.receiver, user], // tiene que estar en este orden por si es una conversacion nueva
        };
        dispatch(addConversation(localConversation));
        setOther(getOther(localConversation));
      }
    }
  }, []);

  const go_back = () => {
    navigation.goBack(null);
  };

  const iSendIt = (message) =>
    message.from === user.id ||
    (message.from.user_id && message.from.user_id === user.id); // hablar con Alberto por este problema

  const getOther = (conv) => {
    const _other = conv.users.filter(u => u.user_id !== user.id);
    return _other[0] ? _other[0] : conv.users[0];
  };

  const sendNewMessage = () => {
    setNewMessage('');
    chats_services
      .sendMessage(other.user_id, {text: newMessage})
      .then((res) => {
        dispatch(pushMessage(res.data));
      });
  };

  const MessageItem = ({item}) =>
    iSendIt(item) ? (
      <View style={styles.row_chat_me}>
        <MessageFormatter
          style={styles.text_chat}
          message={item.text}
          navigation={navigation}
        />
        <Image
          source={require('../../assets/pride-dog_1.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    ) : (
      <View style={styles.row_chat_third}>
        <Image
          source={require('../../assets/pride-dog_1.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.text_chat}>{item.text}</Text>
      </View>
    );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row_header}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={go_back}>
              <Image
                style={styles.boton_back}
                source={require('../../assets/boton_volver_atras.png')}
              />
            </TouchableOpacity>
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
      </View>

      <View style={styles.bottomBar}>
        <Image
          source={require('../../assets/camara.png')}
          style={{marginLeft: 10, marginRight: 10, width: 36, height: 36}}
        />

        <FormInputChat
          textStyle={{color: 'white'}}
          placeholderText="Escriba un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
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
          textStyle={{color: 'black'}}
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
  text_title: {
    color: StylesConfiguration.color,
    // fontFamily: 'GothamBlack-Normal',
    fontSize: 18,
  },
  boton_back: {
    marginHorizontal: 5,
    marginVertical: 5,
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
  chat: {
    marginBottom: 15,
  },
});

export default Chat;
