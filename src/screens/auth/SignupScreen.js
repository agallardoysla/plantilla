import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SocialButton from '../../components/SocialButton';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {AuthContext} from '../../navigation/AuthProvider';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {register, loginFacebook, loginGoogle} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrate con:</Text>
      <View>
        <SocialButton buttonTitle="Facebook" onPress={loginFacebook} />
        <SocialButton buttonTitle="Google" onPress={loginGoogle} />
      </View>
      <View style={styles.signupContainer}>
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
          buttonTitle="Crear cuenta"
          onPress={() => register(email, password)}
        />
      </View>
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
    fontFamily: 'Gotham Black',
    fontWeight: '900',
    fontSize: 24,
    marginBottom: 10,
    color: 'yellow',
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
  },
  signupContainer: {
    marginBottom: 40,
  },
});
