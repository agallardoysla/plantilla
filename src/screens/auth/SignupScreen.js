import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import {GoogleButton, FacebookButton} from '../../components/SocialButton';
import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import MatInput from '../../components/MatInput';
import StylesConfiguration from '../../utils/StylesConfiguration';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const {register, loginFacebook, loginGoogle} = useContext(AuthContext);

  const checkPasswords = () => {
    if (password !== passwordCheck) {
      Alert.alert('Las contraseñas no coinciden');
    } else {
      register(email, password);
    }
  };

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
      />
      <MatInput
        value={passwordCheck}
        label="Confirmar contraseña"
        onChangeText={setPasswordCheck}
        secureTextEntry={true}
        textContentType="password"
        containerStyle={styles.inputPassword}
        onSubmitEditing={checkPasswords}
      />
      <FormButton buttonTitle="Siguiente" onPress={checkPasswords} />
      <Text style={styles.text}>O</Text>
      <Text style={styles.text}>registrate con:</Text>
      <View style={styles.socialLoginContainer}>
        <GoogleButton onPress={loginGoogle} />
        <FacebookButton onPress={loginFacebook} />
      </View>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>¿Ya tenes cuenta? </Text>
        <Text style={styles.navButtonText2}>Ingresa</Text>
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
  logo: {
    width: 150,
    height: 150,
  },
  inputEmail: {
    width: 250,
  },
  inputPassword: {
    width: 230, // 20 menos que inputEmail por el toggle visibility
  },
  text: {
    color: 'white',
    fontSize: 13,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
