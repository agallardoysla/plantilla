import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {GoogleButton, FacebookButton} from '../../components/SocialButton';
import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import MatInput from '../../components/MatInput';
import StylesConfiguration from '../../utils/StylesConfiguration';
import {SafeAreaView} from 'react-native-safe-area-context';


export default function SignupScreen({navigation}) {
  const {register, loginFacebook, loginGoogle} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  });
  const errorLabels = {
    email: 'Se debe elegir un email válido',
    password: 'Se debe ingresar una contraseña válida',
    passwordCheck: 'Las contraseñas no coinciden',
  };
  const [canSubmit, setCanSubmit] = useState(false);

  const emailIsOk = (newEmail) => newEmail.length > 0;
  const passwordIsOk = (newPassword) => newPassword.length >= 6;
  const passwordCheckIsOk = (newPassword) =>
    newPassword.length >= 6 && password === newPassword;

  const doSetField = (setter, validator, errorId, errorLabel) => async (
    newValue,
  ) => {
    await setter(newValue);
    if (validator(newValue)) {
      errors[errorId] = '';
    } else {
      errors[errorId] = errorLabel;
    }
  };

  const updateCanSubmit = () => {
    setCanSubmit(
      emailIsOk(email) &&
        passwordIsOk(password) &&
        passwordCheckIsOk(passwordCheck),
    );
  };

  const createUser = () => {
    login(() => register(email, password));
  };

  const login = (doLogin) => {
    doLogin().then(
      () => navigation.navigate('CreateProfile'),
      (error) => {
        //console.log(error.message);
        const newErrors = {...errors};
        if (error.message.includes('email-already-in-use')) {
          newErrors.email = 'Ya existe una cuenta con este email';
        }
        if (error.message.includes('invalid-email')) {
          newErrors.email = 'Email mal formado';
        }
        setErrors(newErrors);
      },
    );
  };

  useEffect(updateCanSubmit);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo-home.png')}
      />
      <MatInput
        value={email}
        label="Email"
        onChangeText={doSetField(
          setEmail,
          emailIsOk,
          'email',
          errorLabels.email,
        )}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCorrect={false}
        containerStyle={styles.input}
        error={errors.email}
      />
      <MatInput
        value={password}
        label="Contraseña"
        onChangeText={doSetField(
          setPassword,
          passwordIsOk,
          'password',
          errorLabels.password,
        )}
        secureEntry={true}
        textContentType="password"
        containerStyle={styles.input}
        error={errors.password}
      />
      <MatInput
        value={passwordCheck}
        label="Confirmar contraseña"
        onChangeText={doSetField(
          setPasswordCheck,
          passwordCheckIsOk,
          'passwordCheck',
          errorLabels.passwordCheck,
        )}
        secureEntry={true}
        textContentType="password"
        containerStyle={styles.input}
        // onSubmitEditing={checkPasswords}
        error={errors.passwordCheck}
      />
      <FormButton
        buttonTitle="Siguiente"
        onPress={createUser}
        style={canSubmit ? styles.canSubmit : styles.notCanSubmit}
        disabled={!canSubmit}
      />
      <Text style={styles.text}>O</Text>
      <Text style={styles.text}>registrate con:</Text>
      <View style={styles.socialLoginContainer}>
        <GoogleButton onPress={() => login(loginGoogle)} />
        <FacebookButton onPress={() => login(loginFacebook)} />
      </View>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>¿Ya tenes cuenta? </Text>
        <Text style={styles.navButtonText2}>Ingresa</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  input: {
    width: 250,
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
  canSubmit: {},
  notCanSubmit: {
    borderColor: 'black',
  },
});
