import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewPublicationContainer from '../../screens/NewPublication/NewPublicationContainer';
import ViewNewImage from '../../screens/NewPublication/components/ViewNewImage';
import PublishPublication from '../../screens/NewPublication/components/PublishPublication';

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
        component={NewPublicationContainer}
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