import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProfileScreen from '../../screens/Profile/MyProfileScreen';
import Followeds from '../../screens/Profile/SubScreens/Followeds';
import Followers from '../../screens/Profile/SubScreens/Followers';
import Preferences from '../../screens/Profile/Preferences';
import Vips from '../../screens/Profile/SubScreens/Vips';
import ProfileEdition from '../../screens/Profile/SubScreens/ProfileEdition';
import MyAccount from '../../screens/Profile/SubScreens/MyAccount';
import CreateNewAccount from '../../screens/Profile/SubScreens/CreateNewAccount';
import SelectAccount from '../../screens/Profile/SubScreens/SelectAccount';
import NewProfilePhoto from '../../screens/Profile/SubScreens/NewProfilePhoto';
import ViewNewImage from '../../screens/Camera/ViewNewImage';

import VerifyAccount from '../../screens/Profile/SubScreens/VerifyAccount';
import VerifyAccountText from '../../screens/Profile/SubScreens/VerifyAccountText';

export default function MyProfileGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="Followeds" component={Followeds} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="Vips" component={Vips} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="ProfileEdition" component={ProfileEdition} />
      <Stack.Screen name="NewProfilePhoto" component={NewProfilePhoto} />
      <Stack.Screen name="ViewNewImage" component={ViewNewImage} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="SelectAccount" component={SelectAccount} />
      <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
      <Stack.Screen name="VerifyAccountText" component={VerifyAccountText} />
    </Stack.Navigator>
  );
};
