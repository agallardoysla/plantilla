import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import FormSearchInput from '../components/FormSearchInput';
import StylesConfiguration from '../utils/StylesConfiguration';
import ListConversation from '../screens/ListConversation';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const MyConversations = ({navigation}) => {
  const go_back = () => {
    navigation.navigate('Profile');
  };

  const datos = [
    {
      id: 0,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 1,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 2,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 3,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 4,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 5,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 6,
      photo: 'url',
      name_user: 'name',
    },
    {
      id: 8,
      photo: 'url',
      name_user: 'name',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.header}>
          <TouchableOpacity onPress={go_back}>
            <Image
              style={styles.boton_back}
              source={require('../assets/boton_volver_atras.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Image
            source={require('../assets/sobre_amarillo.png')}
            style={styles.sobre_amarillo}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View style={styles.row}>
        <FormSearchInput />
      </View>
   
      <FlatList
        data={datos}
        renderItem={({item}) => (
         <ListConversation item={item} navigation={navigation}/>
     )}
        keyExtractor={(item) => {
          item.id;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'black',
    marginBottom: 10,
  },
  sobre_amarillo: {
    width: 42,
    height: 42,
  },
 
});

export default MyConversations;
