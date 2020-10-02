import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import StylesConfiguration from '../utils/StylesConfiguration';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import FormInputChat from '../components/FormInputChat';
import FormButton_small from '../components/FormButton_small';

const MyChat = ({navigation, route}) => {
  console.log(route.params);

  const [ChatMe, setChatMe] = useState(false); //si es falso porque no es mio es del tercero y cambio de posicion la info

  const go_back = () => {
    navigation.navigate('MyConversations');
  };

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
                source={require('../assets/boton_volver_atras.png')}
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
            <Text style={styles.text_title}>@Skay</Text>
          </View>
        </View>

        {/*Logica para organizar el chat 
      {ChatMe ? (
        <View style={styles.row_chat_me}>
          <Text style={styles.text_chat}>Skay</Text>
          <Image
            source={require('../assets/pride-dog_1.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      ) : (
        <View style={styles.row_chat_third}>
          <Image
            source={require('../assets/pride-dog_1.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.text_chat}>Skay</Text>
        </View>
      )} */}
        <ScrollView>
          <View style={styles.row_chat_third}>
            <Image
              source={require('../assets/pride-dog_1.png')}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.text_chat}>Hola buen dia, como estas?</Text>
          </View>

          <View style={styles.row_chat_me}>
            <Text style={styles.text_chat}>Hola bien, que haces?</Text>
            <Image
              source={require('../assets/pride-dog_1.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomBar}>
        <Image
          source={require('../assets/camara.png')}
       
          style={{marginLeft: 10, marginRight: 10, width: 36, height: 36}}
        />

        <FormInputChat
          textStyle={{color: 'white'}}
          placeholderText="Escriba un mensaje..."
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
    fontFamily: 'GothamBlack-Normal',
    fontSize: 18,
  },
  boton_back: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  text_chat: {
    fontFamily: 'GothamBlack-Normal',
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

export default MyChat;
