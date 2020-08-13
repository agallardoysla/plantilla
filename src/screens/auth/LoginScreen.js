import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import SocialButton from '../../components/SocialButton';
import {AuthContext} from '../../navigation/AuthProvider';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, loginFacebook, loginGoogle} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicia sesión con:</Text>
      <View>
        <SocialButton buttonTitle="Facebook" onPress={loginFacebook} />
        <SocialButton buttonTitle="Google" onPress={loginGoogle} />
      </View>
      <View>
        <FormInput
          value={email}
          placeholderText="Email"
          onChangeText={(userEmail) => setEmail(userEmail)}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <FormInput
          value={password}
          placeholderText="Contraseña"
          onChangeText={(userPassword) => setPassword(userPassword)}
          secureTextEntry={true}
        />
        <FormButton
          buttonTitle="Ingresar"
          onPress={() => login(email, password)}
        />
      </View>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Aún no tienes una cuenta? Registrate
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'GothamBlack-Regular',
    fontWeight: '900',
    fontSize: 24,
    marginBottom: 10,
    color: 'yellow',
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
  },
  navButton: {
    marginTop: 15,
    paddingLeft: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },
  navButtonText: {
    fontSize: 20,
    color: '#6646ee',
  },
});
