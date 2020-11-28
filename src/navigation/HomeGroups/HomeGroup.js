import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import VerifyAccount from '../../screens/Profile/SubScreens/VerifyAccount';

export default function HomeGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
    </Stack.Navigator>
  );
};