import React, {useEffect, useState} from 'react';
import {Image, StatusBar, StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';
import posts_services from '../services/posts_services';
import {addPosts} from '../reducers/posts';
import search_services from '../services/search_services';
import {addSearchedPosts} from '../reducers/searchedPosts';
import {addSearchedProfiles} from '../reducers/searchedProfiles';
import users_services from '../services/users_services';
import {setNotifications} from '../reducers/notifications';
import {setConversations} from '../reducers/conversations';
import chats_services from '../services/chats_services';
import Loading from '../components/Loading';
import {useSelector} from 'react-redux';
import {getUser, setReactions} from '../reducers/user';
import profiles_services from '../services/profiles_services';
import HomeGroup from './HomeGroups/HomeGroup';
import MyProfileGroup from './HomeGroups/MyProfileGroup';
import NotificationsGroup from './HomeGroups/NotificationsGroup';
import SearchGroup from './HomeGroups/SearchGroup';
import NewPublicationGroup from './HomeGroups/NewPublicationGroup';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 13 * 1000);
    // Cargar los posts de Home
    const initHomePostsCount = 20;
    posts_services.list(initHomePostsCount, 0).then((res) => {
      dispatch(addPosts(res.data));
    });
    // Cargar los posts de Busqueda
    search_services.search({search_in: 'posts'}).then((res) => {
      dispatch(addSearchedPosts(res.data.posts));
    });
    // Cargar los perfiles de Busqueda
    search_services.search({search_in: 'users'}).then((res) => {
      dispatch(addSearchedProfiles(res.data.users));
    });
    // Cargar los perfiles para compartir publicacion
    // Cargar notificaciones
    users_services.getNotifications().then((res) => {
      dispatch(setNotifications(res.data));
    });
    // Cargar conversaciones
    chats_services.list().then((res) => {
      dispatch(setConversations(res.data));
    });
    // Cargar reacciones al perfil propio
    profiles_services.getReactions(user.id).then((res) => {
      dispatch(setReactions(res.data));
    });
  }, []);

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

  const options = {
    unmountOnBlur,
  };

  const tabBarOptions = {
    keyboardHidesTabBar: true,
    activeBackgroundColor: 'black',
    inactiveBackgroundColor: 'black',
    activeTintColor: 'yellow',
    inactiveTintColor: 'white',
    style: {
      borderTopWidth: 0,
    },
  };

  const isLargeIcon = (routeName) => routeName === 'HomeGroup';

  const screenOptions = ({route}) => ({
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
          style={[
            styles.icon,
            isLargeIcon(route.name) ? styles.largeIcon : styles.standardIcon,
          ]}
        />
      );
    },
  });

  const unmountOnBlur = false; // resetea el estado del stack

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <StatusBar backgroundColor="black" />

      <Tab.Navigator
        initialRouteName="HomeGroup"
        lazy={false}
        options={options}
        tabBarOptions={tabBarOptions}
        screenOptions={screenOptions}>
        <Tab.Screen
          name="ProfileGroup"
          component={MyProfileGroup}
          options={{title: '', unmountOnBlur}}
        />
        <Tab.Screen
          name="NotificationGroup"
          component={NotificationsGroup}
          options={{
            title: '',
            tabBarBadge: user.unread_notifications,
            unmountOnBlur,
          }}
        />
        <Tab.Screen
          name="HomeGroup"
          component={HomeGroup}
          options={{title: '', unmountOnBlur}}
        />
        <Tab.Screen
          name="SearchGroup"
          component={SearchGroup}
          options={{title: '', unmountOnBlur}}
        />
        <Tab.Screen
          name="NewPublicationGroup"
          component={NewPublicationGroup}
          options={({route}) => ({
            title: '',
            tabBarVisible: route.name !== 'NewPublicationGroup',
            unmountOnBlur,
          })}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: 18,
  },
  standardIcon: {
    width: 25,
    height: 25,
  },
  largeIcon: {
    width: 33,
    height: 33,
  },
});

export default HomeStack;
