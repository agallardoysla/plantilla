import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import FormSearchInput from '../../components/FormSearchInput';
import StylesConfiguration from '../../utils/StylesConfiguration';
import ListConversation from './components/ListConversation';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import chats_services from '../../services/chats_services';
import FormGoBack from '../../components/GoBackButton'
import IconMessage from '../../components/IconMessage'

const MyConversations = ({navigation}) => {
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);

  useEffect(() => {
    chats_services.list().then((res) => {
      // console.log(res.data);
      // console.log(res.data[0].messages);
      // console.log(res.data[0].users);
      const newConversations = res.data.filter(c => c.is_active);
      setConversations(newConversations);
      setFilteredConversations(newConversations);
    });
  }, []);

  const ListConversationItem = ({item}) => (
    <ListConversation conversation={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FormGoBack navigation={navigation}/>
        <IconMessage />
        <View />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default MyConversations;
