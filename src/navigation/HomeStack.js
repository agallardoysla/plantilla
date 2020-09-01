import 'react-native-gesture-handler';
import React from 'react';
import {Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';
import NewPublicationScreen from '../screens/NewPublicationScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

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
      <Stack.Screen name="Profile" component={ProfileScreen} />
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
      <Stack.Screen name="NewPublication" component={NewPublicationScreen} />
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
          switch (route.name) {
            case 'HomeGroup':
              iconName = focused ? icons.icon_home_active : icons.icon_home;
              break;
            case 'ProfileGroup':
              iconName = icons.icon_profile;
              break;
            case 'NotificationGroup':
              iconName = focused
                ? icons.icon_notification_active
                : icons.icon_notification;
              break;
            case 'SearchGroup':
              iconName = focused ? icons.icon_search_active : icons.icon_search;
              break;
            case 'NewPublicationGroup':
              iconName = focused
                ? icons.icon_new_publication_active
                : icons.icon_new_publication;
              break;
            default:
              iconName = '';
          }

          return (
            <Image
              source={iconName}
              style={{width: 25, height: 24, marginTop: 20}}
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
