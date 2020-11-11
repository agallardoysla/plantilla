import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationScreen from '../../screens/Notifications/NotificationScreen';
import OtherProfileGroup from './OtherProfileGroup';

export default function NotificationsGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{
        headerStyle: {backgroundColor: 'black'},
        headerTintColor: 'black',
        headerShown: false,
      }}>
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="OtherProfileGroup" component={OtherProfileGroup} />
    </Stack.Navigator>
  );
}
