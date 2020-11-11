import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from '../../screens/Conversations/Chat';
import MyConversations from '../../screens/Conversations/MyConversations';
import { View } from 'react-native';

export default function MyConversationsGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Default"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Default" component={View} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="MyConversations" component={MyConversations} />
    </Stack.Navigator>
  );
};