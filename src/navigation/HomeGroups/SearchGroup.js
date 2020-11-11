import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../../screens/Search/SearchScreen';
import MyConversations from '../../screens/Conversations/MyConversations';
import OtherProfileGroup from './OtherProfileGroup';

export default function SearchGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerStyle: {backgroundColor: 'black'},
        headerTintColor: 'black',
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="MyConversations" component={MyConversations} />
      <Stack.Screen name="OtherProfileGroup" component={OtherProfileGroup} />
    </Stack.Navigator>
  );
}
