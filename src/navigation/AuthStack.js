import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from '../screens/auth/LandingScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import TermsAndConditions from '../screens/TermsAndConditions';
import CreateProfile from '../screens/auth/CreateProfileScreen';
import Wellcoming from '../screens/auth/WellcomingScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Wellcoming"
        component={Wellcoming}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
