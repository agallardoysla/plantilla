import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PublicationDetails from '../../screens/Home/components/PublicationDetails';
import PostLikes from '../../screens/Home/components/PostLikes';
import Publication from '../../screens/Home/components/Publication'
import { View } from 'react-native';

export default function postGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Default"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Default" component={View} />
      <Stack.Screen name="PublicationDetails" component={PublicationDetails} />
      <Stack.Screen name="PostLikes" component={PostLikes} />
    </Stack.Navigator>
  );
};