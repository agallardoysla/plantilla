import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../../screens/Search/SearchScreen';

export default function SearchGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerStyle: {backgroundColor: 'black'},
        headerTintColor: 'black',
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
