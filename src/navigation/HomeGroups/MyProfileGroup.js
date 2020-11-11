import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProfileScreen from '../../screens/Profile/components/MyProfileScreen';
import Followeds from '../../screens/Profile/components/Followeds';
import Followers from '../../screens/Profile/components/Followers';
import Preferences from '../../screens/Profile/Preferences';
import PublicationDetails from '../../screens/Home/components/PublicationDetails';
import ViewNewImage from '../../screens/NewPublication/components/ViewNewImage';
import Vip from '../../screens/Profile/components/Vip';
import ProfileEdition from '../../screens/Profile/components/ProfileEdition';
import NewProfilePhotoContainer from '../../screens/Profile/NewProfilePhoto/NewProfilePhotoContainer';

export default function MyProfileGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={MyProfileScreen} />
      <Stack.Screen name="Followeds" component={Followeds} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="PublicationDetails" component={PublicationDetails} />
      <Stack.Screen name="ProfileEdition" component={ProfileEdition} />
      <Stack.Screen name="NewProfilePhoto" component={NewProfilePhotoContainer} />
      <Stack.Screen name="ViewNewImage" component={ViewNewImage} />
      <Stack.Screen name="Vip" component={Vip} />
    </Stack.Navigator>
  );
};
