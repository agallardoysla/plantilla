import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProfileScreen from '../../screens/Profile/components/MyProfileScreen';
import Followeds from '../../screens/Profile/components/Followeds';
import Followers from '../../screens/Profile/components/Followers';
import MyConversations from '../../screens/Conversations/MyConversations';
import Preferences from '../../screens/Profile/Preferences';
import PublicationDetails from '../../screens/Home/components/PublicationDetails';
import ListConversation from '../../screens/Conversations/components/ListConversation';
import Chat from '../../screens/Conversations/Chat';
import ViewNewImage from '../../screens/NewPublication/components/ViewNewImage';
import Vip from '../../screens/Profile/components/Vip';
import ProfileEdition from '../../screens/Profile/components/ProfileEdition';
import NewProfilePhotoContainer from '../../screens/Profile/NewProfilePhoto/NewProfilePhotoContainer';
import OtherProfileGroup from './OtherProfileGroup';

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
      <Stack.Screen name="MyConversations" component={MyConversations} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="PublicationDetails" component={PublicationDetails} />
      <Stack.Screen name="ListConversation" component={ListConversation} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ProfileEdition" component={ProfileEdition} />
      <Stack.Screen name="NewProfilePhoto" component={NewProfilePhotoContainer} />
      <Stack.Screen name="ViewNewImage" component={ViewNewImage} />
      <Stack.Screen name="Vip" component={Vip} />
      <Stack.Screen name="OtherProfileGroup" component={OtherProfileGroup} />
    </Stack.Navigator>
  );
};
