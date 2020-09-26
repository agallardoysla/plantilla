import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import users_services from '../services/users_services';
import GenericProfile from './GenericProfile';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function OtherProfile({route}) {
  const {user} = useContext(AuthContext);
  const [otherUser, setOtherUser] = useState();
  const userId = route.params.user_id;
  
  useEffect(() => {
    if (userId !== user.id) {
      users_services.get(userId).then((res) => setOtherUser(res.data));
    }
  }, [user.id]);

  return userId !== user.id ? (
    otherUser ? (
      <GenericProfile user={otherUser} isLoggedUser={false} />) : null
  ) : (
    <GenericProfile user={user} isLoggedUser={true} />
  );
};
