import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import users_services from '../../services/users_services';
import GenericProfile from './GenericProfile';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function OtherProfile({route}) {
  const {user} = useContext(AuthContext);
  const [otherUser, setOtherUser] = useState();
  const userId = route.params.user_id;
  const navigation = route.params.navigation;

  useEffect(() => {
    if (userId !== user.id) {
      users_services.get(userId).then((res) => setOtherUser(res.data));
    }
  }, [user.id]);

  return userId !== user.id ? (
    otherUser ? (
      <GenericProfile
        localUser={otherUser}
        isLoggedUser={false}
        navigation={navigation}
      />
    ) : <View style={styles.container}></View>
  ) : (
    <GenericProfile
      localUser={user}
      isLoggedUser={true}
      navigation={navigation}
    />)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
