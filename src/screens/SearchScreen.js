import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function SearchScreen() {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>

      {/* <Text style={styles.text}>Holaa {user.uid}</Text> */}
      <Text style={styles.text}>Search</Text>
      {/* <FormButton buttonTitle="Logout" onPress={() => logout()} /> */}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});