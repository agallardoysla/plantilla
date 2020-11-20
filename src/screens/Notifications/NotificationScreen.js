import React, { useEffect } from 'react';
import {Text, StyleSheet, ScrollView, View, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import GoBackButton from '../../components/GoBackButton';
import { getNotifications } from '../../reducers/notifications';
import StylesConfiguration from '../../utils/StylesConfiguration';
import Notification from './Notification';

export default function NotificationScreen({ navigation }) {
  const notifications = useSelector(getNotifications);

  const goToProfile = (notification) => () => {
    navigation.navigate('OtherProfileGroup', {
      screen: 'OtherProfile',
      params: {
        user_id: notification.from_user.user_id,
      },
    });
  };

  const NotificationItem = ({item}) => (
    <Notification
      notification={item}
      navigation={navigation}
      goToProfile={goToProfile}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <GoBackButton navigation={navigation} />
        <Text style={styles.titulo}>NOTIFICACIONES</Text>
        <Image
          style={styles.tuercaBlanca}
          source={require('../../assets/tuerca_blanca_grande.png')}
        />
      </View>
      <FlatList
        style={styles.list}
        data={notifications}
        renderItem={NotificationItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* <ScrollView>
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
      </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  tuercaBlanca: {
    width: 30,
    height: 30,
  },
  titulo: {
    fontFamily: StylesConfiguration.fontFamily,
    color: StylesConfiguration.color,
    fontSize: 14,
    marginHorizontal: 10,
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
