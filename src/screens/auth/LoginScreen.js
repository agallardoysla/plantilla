import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FormButton from '../../components/FormButton';
import {FacebookButton, GoogleButton} from '../../components/SocialButton';
import {AuthContext} from '../../navigation/AuthProvider';
import MatInput from '../../components/MatInput';
import StylesConfiguration from '../../utils/StylesConfiguration';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, loginFacebook, loginGoogle} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo-home.png')}
      />
      <MatInput
        value={email}
        label="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCorrect={false}
        containerStyle={styles.inputEmail}
      />
      <MatInput
        value={password}
        label="Contraseña"
        onChangeText={setPassword}
        secureTextEntry={true}
        textContentType="password"
        containerStyle={styles.inputPassword}
        onSubmitEditing={() => login(email, password)}
      />
      <FormButton
        buttonTitle="INGRESAR"
        onPress={() => login(email, password)}
      />
      <Text style={styles.text}>O</Text>
      <Text style={styles.text}>inicia con:</Text>
      <View style={styles.socialLoginContainer}>
        <GoogleButton onPress={loginGoogle} />
        <FacebookButton onPress={loginFacebook} />
      </View>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>¿No tenes cuenta? </Text>
        <Text style={styles.navButtonText2}>Registrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  inputEmail: {
    width: 250,
  },
  inputPassword: {
    width: 230, // 20 menos que inputEmail por el toggle visibility
  },
  logo: {
    width: 150,
    height: 150,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 13,
  },
  navButton: {
    marginTop: 15,
    paddingLeft: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 15,
    color: 'white',
  },
  navButtonText2: {
    fontSize: 15,
    color: StylesConfiguration.color,
  },
});
