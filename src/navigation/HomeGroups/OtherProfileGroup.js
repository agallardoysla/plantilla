import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OtherProfile from '../../screens/Profile/OtherProfile';
import Followeds from '../../screens/Profile/SubScreens/Followeds';
import Followers from '../../screens/Profile/SubScreens/Followers';
import { View } from 'react-native';

export default function OtherProfileGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Default"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Default" component={View} />
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
      <Stack.Screen name="Followeds" component={Followeds} />
      <Stack.Screen name="Followers" component={Followers} />
    </Stack.Navigator>
  );
};