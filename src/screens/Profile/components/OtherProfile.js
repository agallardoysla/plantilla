import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getUser} from '../../../reducers/user';
import users_services from '../../../services/users_services';
import GenericProfile from '../GenericProfile';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function OtherProfile({route}) {
  const user = useSelector(getUser);
  const [otherUser, setOtherUser] = useState();
  const [userId, setuserId] = useState(route.params.user_id);
  const navigation = route.params.navigation;

  useEffect(() => {
    console.log(route.params.user_id);
    if (userId !== user.id) {
      users_services.get(userId).then((res) => setOtherUser(res.data));
    }
  }, [userId]);

  return userId !== user.id ? (
    otherUser ? (
      <GenericProfile
        localUser={otherUser}
        isLoggedUser={false}
        navigation={navigation}
      />
    ) : (
      <View style={styles.container} />
    )
  ) : (
    <GenericProfile
      localUser={user}
      isLoggedUser={true}
      navigation={navigation}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
