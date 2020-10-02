import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import StylesConfiguration from '../utils/StylesConfiguration';

const ListConversation = ({item, navigation}) => {
  //MyConversations > ListConversation(FlatList) > MyChat
  const goMyChat = () => {
    navigation.navigate('MyChat', item);
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
          <Text style={styles.text_title_profile}>@Skay</Text>
          <Text style={styles.text_description}>
            <Text style={styles.text_title_profile}>@Gruñon: </Text>Buen dia
            como estas?
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
