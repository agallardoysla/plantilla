import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FormSearchInput from '../../components/FormSearchInput';
import ListConversation from './components/ListConversation';
import FormGoBack from '../../components/GoBackButton';
import IconMessage from '../../components/IconMessage';
import {getConversations} from '../../reducers/conversations';
import {useSelector} from 'react-redux';


const MyConversations = ({navigation}) => {
  const [filteredConversations, setFilteredConversations] = useState([]);
  const conversations = useSelector(getConversations);

  useEffect(() => {
    setFilteredConversations(conversations);
  }, []);

  const ListConversationItem = ({item}) => (
    <ListConversation conversationId={item.id} navigation={navigation} />
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
