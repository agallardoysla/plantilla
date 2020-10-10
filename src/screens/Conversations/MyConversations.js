import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import FormSearchInput from '../../components/FormSearchInput';
import StylesConfiguration from '../../utils/StylesConfiguration';
import ListConversation from './ListConversation';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import chats_services from '../../services/chats_services';

const MyConversations = ({navigation}) => {
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);

  const go_back = () => {
    navigation.navigate('Profile');
  };

  const datos = [
    {
      id: 0,
      photo: 'url',
      name_user: 'name',
    },
  ];

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

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.header}>
          <TouchableOpacity onPress={go_back}>
            <Image
              style={styles.boton_back}
              source={require('../../assets/boton_volver_atras.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Image
            source={require('../../assets/sobre_amarillo.png')}
            style={styles.sobre_amarillo}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View style={styles.row}>
        <FormSearchInput />
      </View>

      <FlatList
        data={filteredConversations}
        renderItem={({item}) => (
          <ListConversation conversation={item} navigation={navigation} />
     )}
        keyExtractor={(item, i) => i}
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
