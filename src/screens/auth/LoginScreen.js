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
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const {existProfile, login, loginFacebook, loginGoogle} = useContext(AuthContext);
  const errorLabels = {
    email: 'Se debe elegir un email válido',
    noExistEmail: 'No existe una cuenta con este email',
    password: 'Se debe ingresar una contraseña válida',
  };
  const [canSubmit, setCanSubmit] = useState(false);

  const emailIsOk = (newEmail) => newEmail.length > 0;
  const passwordIsOk = (newPassword) => newPassword.length > 0;

  const doSetEmail = (newEmail) => {
    setEmail(newEmail);
    const newErrors = {...errors};
    if (emailIsOk(newEmail)) {
      newErrors.email = '';
      setErrors(newErrors);
    // } else if (!existProfile) {
    //   newErrors.email = errorLabels.noExistEmail;
    //   setErrors(newErrors);
    } else {
      newErrors.email = errorLabels.email;
      setErrors(newErrors);
    }
    updateCanSubmit();
  };

  const doSetPassword = (newPassword) => {
    setPassword(newPassword);
    const newErrors = {...errors};
    if (passwordIsOk(newPassword)) {
      newErrors.password = '';
      setErrors(newErrors);
    } else {
      newErrors.password = errorLabels.password;
      setErrors(newErrors);
    }
    updateCanSubmit();
  };

  const updateCanSubmit = () => {
    console.log(emailIsOk(email) && passwordIsOk(password));
    setCanSubmit(emailIsOk(email) && passwordIsOk(password));
  };

  /* Deprecado */
  const loginOrCreateProfile = () => {
    if (canSubmit) {
      login(email, password);
    }
    // } else {
    //   navigation.navigate('Signup');
    // }
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
        onChangeText={doSetEmail}
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
        onChangeText={doSetPassword}
        secureTextEntry={true}
        textContentType="password"
        containerStyle={styles.input}
        // onSubmitEditing={loginOrCreateProfile}
        error={errors.password}
      />
      <FormButton
        buttonTitle="INGRESAR"
        onPress={loginOrCreateProfile}
        style={canSubmit ? styles.canSubmit : styles.notCanSubmit}
        disabled={!canSubmit}
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
