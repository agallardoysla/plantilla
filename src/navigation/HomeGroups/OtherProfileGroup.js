import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OtherProfile from '../../screens/Profile/components/OtherProfile';
import Followeds from '../../screens/Profile/components/Followeds';
import Followers from '../../screens/Profile/components/Followers';

export default function OtherProfileGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="OtherProfile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
      <Stack.Screen name="Followeds" component={Followeds} />
      <Stack.Screen name="Followers" component={Followers} />
    </Stack.Navigator>
  );
};