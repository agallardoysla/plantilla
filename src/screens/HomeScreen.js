import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import View_Publication from './view_publication';

const window = Dimensions.get('window');

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function HomeScreen() {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/*Boton de retroceder*/}
        <Image style={{top: 10}} source={require('../assets/boton_volver_atras.png')}/>

        {/*Publications */}
        <View_Publication />
        <View_Publication />
        <View_Publication />
        <View_Publication />
        <View_Publication />
        <View_Publication />

        {/* <Text style={styles.text}>Holaa {user.uid}</Text> */}
        {/* <FormButton buttonTitle="Logout" onPress={() => logout()} /> */}
      </ScrollView>
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
});
