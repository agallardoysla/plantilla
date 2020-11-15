import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedUser} from '../../reducers/loggedUser';
import users_services from '../../services/users_services';
import GenericProfile from './components/GenericProfile';
import {setOtherUserReactions, updateOtherUser} from '../../reducers/otherUser';
import StylesConfiguration from '../../utils/StylesConfiguration';
import { SafeAreaView } from 'react-native-safe-area-context';
import profiles_services from '../../services/profiles_services';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function OtherProfile({navigation, route}) {
  const user = useSelector(getLoggedUser);
  const userId = route.params.user_id;
  const [loading, setLoading] = useState(userId !== user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== user.id) {
      users_services.get(userId).then((res) => {
        dispatch(updateOtherUser(res.data));
        profiles_services.getReactions(userId).then((_res) => {
          dispatch(setOtherUserReactions(_res.data));
          setLoading(false);
        });
      });
    }
  }, []);

  return loading ? (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="small" color={StylesConfiguration.color} />
    </SafeAreaView>
  ) : (
    <GenericProfile isLoggedUser={userId === user.id} navigation={navigation} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
