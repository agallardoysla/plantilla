import React, {useContext, useEffect} from 'react';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import {StyleSheet, Text, Button, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import users_services from '../../../services/users_services';
import {setAccounts} from '../../../reducers/accounts';
import {AuthContext} from '../../../navigation/AuthProvider';
import GoBackButton from '../../../components/GoBackButton';

export default function VerifyAccountText({navigation}) {
  const {logout} = useContext(AuthContext);
  const dispatch = useDispatch();
  const message =
    'Buscamos persona/instituciones o empresas ' +
    'que participen activamente de nuestra comunidad. \n \n' +
    'Podes solicitar la verificación mediante el siguiente formulario: \n \n' +
    '(No cobramos ni pedimos mas info para verificar)';

  useEffect(() => {
    users_services.getAccounts().then((res) => {
      dispatch(setAccounts(res.data));
    });
  }, []);

  const goToVerify = () => {
    navigation.navigate('VerifyAccount');
  };

  return (
    <>
      <View style={styles.upperBar}>
        <GoBackButton navigation={navigation} />
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>solicitar verificación</Text>
        </View>
        <Text style={styles.textMessage}>{message}</Text>
        <TouchableOpacity
          style={styles.action}
          onPress={() => {
            goToVerify();
          }}>
          <Text style={styles.textButton}>ir al formulario</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
  upperBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 35,
    backgroundColor: 'black',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 28,
    marginBottom: 24,
  },
  text: {
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    fontSize: 18,
    textDecorationLine: 'underline',
    marginBottom: 45,
  },
  textMessage: {
    color: 'white',
    fontFamily: StylesConfiguration.fontFamily,
    textAlign: 'left',
    fontSize: 18,
    margin: 30,
  },
  textButton: {
    color: 'black',
    textDecorationStyle: 'solid',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  action: {
    backgroundColor: '#E9FC64',
    alignItems: 'center',
    justifyContent: 'center',
    width: 270,
    padding: 10,
    borderRadius: 5,
    marginTop: 70,
  },
});
