import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FormButton from '../../components/FormButton';
import {FacebookButton, GoogleButton} from '../../components/SocialButton';
import {AuthContext} from '../../navigation/AuthProvider';
import MatInput from '../../components/MatInput';
import StylesConfiguration from '../../utils/StylesConfiguration';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/session';
import session from '../../utils/session';

export default function LoginScreen({navigation}) {
  const {loginEmail, loginFacebook, loginGoogle} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const errorLabels = {
    email: 'Se debe elegir un email válido',
    noExistEmail: 'No existe una cuenta con este email',
    password: 'Se debe ingresar una contraseña válida',
  };
  const [canSubmit, setCanSubmit] = useState(false);

  const emailIsOk = (newEmail) => newEmail.length > 0;
  const passwordIsOk = (newPassword) => newPassword.length > 0;

  const doSetField = (setter, validator, errorId, errorLabel) => (newValue) => {
    setter(newValue);
    if (validator(newValue)) {
      errors[errorId] = '';
    } else {
      errors[errorId] = errorLabel;
    }
    updateCanSubmit();
  };

  const updateCanSubmit = () => {
    //console.log('can submit: ', emailIsOk(email) && passwordIsOk(password));
    setCanSubmit(emailIsOk(email) && passwordIsOk(password));
  };

  const doLogin = (loginFunction) => () => {
    console.log("dologin")
    loginFunction().then(
      () => navigation.navigate('CreateProfile'),
      (error) => {
        //console.log(error.message);
        const newErrors = {...errors};
        if (error.message.includes('wrong-password')) {
          newErrors.password = 'Contraseña incorrecta';
        }
        if (error.message.includes('invalid-email')) {
          newErrors.email = 'Email mal formado';
        }
        if (error.message.includes('user-not-found')) {
          newErrors.email = 'No existe una cuenta con este email';
        }
        setErrors(newErrors);
      },
    );
  };

  const loginMail = () => {
    if (canSubmit) {
      doLogin(() => session.loginEmail(email, password))();
    }
  };

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container || {}}>
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
        // onSubmitEditing={loginOrCreateProfile}
        error={errors.password}
      />
      <FormButton
        buttonTitle="INGRESAR"
        onPress={() => dispatch(login(email, password))}
        style={canSubmit ? styles.canSubmit : styles.notCanSubmit}
        disabled={!canSubmit}
      />
      <Text style={styles.text}>O</Text>
      <Text style={styles.text}>inicia con:</Text>
      <View style={styles.socialLoginContainer}>
        <GoogleButton onPress={doLogin(loginGoogle)} />
        <FacebookButton onPress={doLogin(loginFacebook)} />
      </View>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>¿No tenes cuenta? </Text>
        <Text style={styles.navButtonText2}>Registrate</Text>
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
  input: {
    width: 250,
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
  canSubmit: {},
  notCanSubmit: {
    borderColor: 'black',
  },
});
