import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedUser} from '../../reducers/loggedUser';
import users_services from '../../services/users_services';
import GenericProfile from './components/GenericProfile';
import { updateOterUser } from '../../redux/actions/otherProfile';
import StylesConfiguration from '../../utils/StylesConfiguration';
import { SafeAreaView } from 'react-native-safe-area-context';
import profiles_services from '../../services/profiles_services';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function OtherProfile({ navigation, route}) {
  const user = useSelector(getLoggedUser);
  const userId = route.params.user_id;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [userO, setuserO] = useState(null);

  useEffect(() => {
    if (userId !== user.id) {
      getUser();
    }
  }, []);
  
  useEffect(() => {
    if (userO !== null) {
      dispatch(updateOterUser(userO))
    }
  }, [userO]);

  const getUser = async () => {
    try {
      let request = await users_services.get(userId);
      setuserO(request.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return loading ? (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="small" color={StylesConfiguration.color} />
    </SafeAreaView>
  ) : <GenericProfile localUser={userO} isLoggedUser={userId === user.id} navigation={navigation} /> ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
