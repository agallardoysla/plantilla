import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import Publication from '../../screens/Home/components/Publication';
import PublicationDetails from '../../screens/Home/components/PublicationDetails';
import PostComments from '../../screens/Home/components/PostComments';
import PostLikes from '../../screens/Home/components/PostLikes';
import OtherProfile from '../../screens/Profile/components/OtherProfile';
import Followeds from '../../screens/Profile/components/Followeds';
import Followers from '../../screens/Profile/components/Followers';
import Chat from '../../screens/Conversations/Chat';
import MyConversations from '../../screens/Conversations/MyConversations';
import ListConversation from '../../screens/Conversations/components/ListConversation';

export default function HomeGroup() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Publication" component={Publication} />
      <Stack.Screen name="PublicationDetails" component={PublicationDetails} />
      <Stack.Screen name="PostComments" component={PostComments} />
      <Stack.Screen name="PostLikes" component={PostLikes} />
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
      <Stack.Screen name="Followeds" component={Followeds} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="MyConversations" component={MyConversations} />
      <Stack.Screen name="ListConversation" component={ListConversation} />
    </Stack.Navigator>
  );
};