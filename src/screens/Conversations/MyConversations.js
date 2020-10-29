import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, FlatList} from 'react-native';
import FormSearchInput from '../../components/FormSearchInput';
import ListConversation from './components/ListConversation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import chats_services from '../../services/chats_services';
import {getConversations} from '../../reducers/conversations';
import {useSelector} from 'react-redux';


const MyConversations = ({navigation}) => {
  const [filteredConversations, setFilteredConversations] = useState([]);
  const conversations = useSelector(getConversations);

  useEffect(() => {
    setFilteredConversations(conversations);
  }, []);

  const ListConversationItem = ({item}) => (
    <ListConversation conversation={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Image
              style={styles.boton_back}
              source={require('../../assets/boton_volver_atras.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Image
            source={require('../../assets//sobre_amarillo.png')}
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
        renderItem={ListConversationItem}
        keyExtractor={(item, index) => index.toString()}
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
