import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationScreen from '../../screens/Notifications/NotificationScreen';

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
    </Stack.Navigator>
  );
}
