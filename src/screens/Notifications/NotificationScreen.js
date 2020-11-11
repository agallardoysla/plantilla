import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { getNotifications } from '../../reducers/notifications';
import Notification from './Notification';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function NotificationScreen({ navigation }) {
  const notifications = useSelector(getNotifications);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: '#E9FC64', marginTop: 10 }}>NOTIFICACIONES</Text>
      <ScrollView>
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            type={notification.event}
            notification={notification.from_user}
            onProfile={() =>
              navigation.navigate('OtherProfileGroup', {
                screen: 'OtherProfile',
                params: {
                  user_id: notification.from_user.user_id,
                },
              })
            }
            // onLike={() => navigation.navigate('PublicationDetails', { notification })}
            date={notification.created_at}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignContent: 'center',
    alignItems: 'center',
  },
});
