import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import FormSearchInput from '../../components/FormSearchInput';
import ListConversation from './components/ListConversation';
import GoBackButton from '../../components/GoBackButton';
import IconMessage from '../../components/IconMessage';
import { getConversations } from '../../reducers/conversations';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchConversations } from '../../redux/actions/conversations';
import StylesConfiguration from '../../utils/StylesConfiguration';


const MyConversations = ({ navigation }) => {
  const [filteredConversations, setFilteredConversations] = useState([]);
  const conversations = useSelector(getConversations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConversations());
  }, []);

  useEffect(() => {
    setFilteredConversations(conversations.conversations);
  }, [conversations]);

  const ListConversationItem = ({ item }) => (
    <ListConversation conversationId={item.id} navigation={navigation} />
  );

  return conversations.fetching 
    ? (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={StylesConfiguration.color} />
      </SafeAreaView> 
    ) : (
      <SafeAreaView style={styles.container}>
        <View style={styles.row}>
          <GoBackButton navigation={navigation} />
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
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default MyConversations;
