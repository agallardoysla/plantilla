import 'react-native-gesture-handler';
import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import PostComments from '../screens/PostComments';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import PostLikes from '../screens/PostLikes';
import Publication from '../screens/Publication';
import ViewNewImage from '../screens/NewPublication/ViewNewImage';
import NewPublicationContainer from '../screens/NewPublication/NewPublicationContainer';
import PublishPublication from '../screens/NewPublication/PublishPublication';
import MyConversations from '../screens/Conversations/MyConversations';
import OtherProfile from '../screens/profile/OtherProfile';
import Followeds from '../screens/profile/Followeds';
import Followers from '../screens/profile/Followers';
import MyProfileScreen from '../screens/profile/MyProfileScreen';
import Preferences from '../screens/profile/Preferences';
import PublicationDetails from '../screens/PublicationDetails';
import ListConversation from '../screens/Conversations/ListConversation';
import MyChat from '../screens/Conversations/MyChat';
import ProfileEdition from '../screens/profile/ProfileEdition';
import NewProfilePhotoContainer from '../screens/profile/NewProfilePhoto/NewProfilePhotoContainer';


// import {Icon, Avatar, Badge, withBadge} from 'react-native-elements';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeGroup = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: '#242424'},
        headerTintColor: '#242424', //color del titulo
        //oculto el header
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Publication" component={Publication} />
      <Stack.Screen name="PublicationDetails" component={PublicationDetails} />
      <Stack.Screen name="PostComments" component={PostComments} />
      <Stack.Screen name="PostLikes" component={PostLikes} />
      <Stack.Screen name="OtherProfile" component={OtherProfile}  screenOptions={{
        backgroundColor: 'red',
      }}  />
      <Stack.Screen name="Followeds" component={Followeds} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="MyChat" component={MyChat} />
      <Stack.Screen name="MyConversations" component={MyConversations} />
      <Stack.Screen name="ListConversation" component={ListConversation} />

    </Stack.Navigator>
  );
};

const ProfileGroup = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {backgroundColor: 'black'},
        headerTintColor: 'black',
        headerShown: false,
        backgroundColor:'black'
      }}>
      <Stack.Screen name="Profile" component={MyProfileScreen} />
      <Stack.Screen name="Followeds" component={Followeds} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="MyConversations" component={MyConversations} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="PublicationDetails" component={PublicationDetails} />
      <Stack.Screen name="ListConversation" component={ListConversation} />
      <Stack.Screen name="MyChat" component={MyChat} />
      <Stack.Screen name="ProfileEdition" component={ProfileEdition} />
      <Stack.Screen name="NewProfilePhoto" component={NewProfilePhotoContainer} />
      <Stack.Screen name="ViewNewImage" component={ViewNewImage} />
    </Stack.Navigator>
  );
};

const NotificationGroup = ({navigation}) => {
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
};

const SearchGroup = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerStyle: {backgroundColor: 'black'},
        headerTintColor: 'black',
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="MyConversations" component={MyConversations} />
    </Stack.Navigator>
  );
};

const NewPublicationGroup = ({navigation}) => {
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

const HomeStack = () => {
  const icons = {
    icon_profile: require('../assets/foto_perfil.png'),

    icon_notification: require('../assets/icono_notificacion.png'),
    icon_home: require('../assets/icono_home.png'),
    icon_search: require('../assets/icono_buscar.png'),
    icon_new_publication: require('../assets/icono_camara.png'),

    // icon_profile_active: require('../assets/foto_perfil.png'),
    icon_notification_active: require('../assets/icono_notificacion_activo.png'),
    icon_home_active: require('../assets/icono_home_activo.png'),
    icon_search_active: require('../assets/icono_buscar_activo.png'),
    icon_new_publication_active: require('../assets/icono_camara_activo.png'),
  };

  return (
    <>
      <StatusBar backgroundColor="black" />

      <Tab.Navigator
        initialRouteName="HomeGroup"
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeBackgroundColor: 'black',
          inactiveBackgroundColor: 'black',
          activeTintColor: 'yellow',
          inactiveTintColor: 'white',
          style: {
            borderTopWidth: 0,
          },
         
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;
            let size;
            switch (route.name) {
              case 'HomeGroup':
                iconName = focused ? icons.icon_home_active : icons.icon_home;
                size = 33;
                break;
              case 'ProfileGroup':
                iconName = icons.icon_profile;
                size = 25;
                break;
              case 'NotificationGroup':
                iconName = focused
                  ? icons.icon_notification_active
                  : icons.icon_notification;
                size = 25;
                break;
              case 'SearchGroup':
                iconName = focused
                  ? icons.icon_search_active
                  : icons.icon_search;
                size = 25;
                break;
              case 'NewPublicationGroup':
                iconName = focused
                  ? icons.icon_new_publication_active
                  : icons.icon_new_publication;
                size = 25;
                break;
              default:
                size = 25;
                iconName = '';
            }

            return (
              <Image
                source={iconName}
                style={{width: size, height: size, marginTop: 18}}
              />
            );
          },
        })}>
        <Tab.Screen
          name="ProfileGroup"
          component={ProfileGroup}
          options={{title: ''}}
        />
        <Tab.Screen
          name="NotificationGroup"
          component={NotificationGroup}
          options={{title: '', tabBarBadge: 20}}
        />
        <Tab.Screen
          name="HomeGroup"
          component={HomeGroup}
          options={{title: ''}}
        />
        <Tab.Screen
          name="SearchGroup"
          component={SearchGroup}
          options={{title: ''}}
        />
        <Tab.Screen
          name="NewPublicationGroup"
          component={NewPublicationGroup}
          options={({route}) => ({
            title: '',
            // tabBarVisible: route.name === 'NewPublicationGroup',
          })}
        />
      </Tab.Navigator>
    </>
  );
};

export default HomeStack;
