import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import VerifyAccount from '../../screens/Profile/SubScreens/VerifyAccount';
import VerifyAccountText from '../../screens/Profile/SubScreens/VerifyAccountText';
import PostLikes from '../../screens/Home/components/PostLikes';
import PostComments from '../../screens/Home/components/PostComments';

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
      <Stack.Screen name="VerifyAccountText" component={VerifyAccountText} />
      <Stack.Screen name="PostLikes" component={PostLikes} />
      <Stack.Screen name="PostComments" component={PostComments} />
    </Stack.Navigator>
  );
};