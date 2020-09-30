import 'react-native-gesture-handler';
import React from 'react';
import {Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';
import Followed from '../screens/Followed';
import Followers from '../screens/Followers';
import PostComments from '../screens/PostComments';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import PostLikes from '../screens/PostLikes';
import Publication from '../screens/Publication';
import ViewNewImage from '../screens/NewPublication/ViewNewImage';
import NewPublicationContainer from '../screens/NewPublication/NewPublicationContainer';
import PublishPublication from '../screens/NewPublication/PublishPublication';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeGroup = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        //oculto el header
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Publication" component={Publication} />
      <Stack.Screen name="PostComments" component={PostComments} />
      <Stack.Screen name="PostLikes" component={PostLikes} />
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
      }}>
      <Stack.Screen
        name="Profile"
        component={MyProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Followed"
        component={Followed}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Followers"
        component={Followers}
        options={{headerShown: false}}
      />
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
      }}>
      <Stack.Screen name="Search" component={SearchScreen} />
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
    <Tab.Navigator
      initialRouteName="HomeGroup"
      tabBarOptions={{
        activeBackgroundColor: 'black',
        inactiveBackgroundColor: 'black',
        activeTintColor: 'yellow',
        inactiveTintColor: 'white',
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
              iconName = focused ? icons.icon_search_active : icons.icon_search;
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
        options={{title: ''}}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;
