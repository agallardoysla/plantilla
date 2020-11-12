import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProfileScreen from '../../screens/Profile/MyProfileScreen';
import Followeds from '../../screens/Profile/SubScreens/Followeds';
import Followers from '../../screens/Profile/SubScreens/Followers';
import Preferences from '../../screens/Profile/Preferences';
import ViewNewImage from '../../screens/NewPublication/components/ViewNewImage';
import Vip from '../../screens/Profile/SubScreens/Vip';
import ProfileEdition from '../../screens/Profile/SubScreens/ProfileEdition';
import NewProfilePhotoContainer from '../../screens/Profile/NewProfilePhoto/NewProfilePhotoContainer';
import MyAccount from '../../screens/Profile/SubScreens/MyAccount';
import CreateNewAccount from '../../screens/Profile/SubScreens/CreateNewAccount';

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
      <Stack.Screen name="Vip" component={Vip} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="ProfileEdition" component={ProfileEdition} />
      <Stack.Screen name="NewProfilePhoto" component={NewProfilePhotoContainer} />
      <Stack.Screen name="ViewNewImage" component={ViewNewImage} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} />
    </Stack.Navigator>
  );
};
