import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewPublication from '../../screens/NewPublication/NewPublication';
import PublishPublication from '../../screens/NewPublication/components/PublishPublication';
import ViewNewImage from '../../screens/Camera/ViewNewImage';

export default function NewPublicationGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="NewPublication"
      screenOptions={{
        headerStyle: {backgroundColor: 'black'},
        headerTintColor: 'black',
        headerShown: false,
      }}>
      <Stack.Screen
        name="NewPublication"
        component={NewPublication}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewNewImage"
        component={ViewNewImage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PublishPublication"
        component={PublishPublication}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};