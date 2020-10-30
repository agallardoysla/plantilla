import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {getNotifications} from '../../reducers/notifications';

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function NotificationScreen() {
  const notifications = useSelector(getNotifications);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: '#E9FC64', marginTop: 10}}>NOTIFICACIONES</Text>
      <ScrollView>
        <View style={styles.imageRow}>
          <Image
            source={require('../../assets/pride-dog_1.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.a3}>A</Text>
          <Text style={styles.username}>@username</Text>
          <Text style={styles.leGuastaTuFoto}> Le guasta tu foto</Text>
          <Image
            source={require('../../assets/foto.png')}
            resizeMode="contain"
            style={styles.image6}
          />
        </View>

        <View style={styles.imageRow}>
          <Image
            source={require('../../assets/pride-dog_1.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.a3}>A</Text>
          <Text style={styles.username}>@username</Text>
          <Text style={styles.teEnvioUnMensaje}> Te envio un mensaje </Text>
          <Image
            source={require('../../assets/sobre_amarillo_1.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View style={styles.imageRow}>
          <Image
            source={require('../../assets/pride-dog_1.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.username}>@username</Text>
          <Text style={styles.teEnvioUnMensaje}> Te mando un</Text>

          <View style={styles.rect}>
            <Text style={styles.challenge1}>CHALLENGE</Text>
          </View>
        </View>

        <View style={styles.imageRow}>
          <Image
            source={require('../../assets/pride-dog_1.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.a3}>A</Text>
          <Text style={styles.username}>@username</Text>

          <Text style={styles.leGuastaTuFoto2}> Le guasta tu video</Text>

          <ImageBackground
            source={require('../../assets/foto.png')}
            resizeMode="contain"
            style={styles.image6}>
            <Image
              source={require('../../assets/boton_play_1.png')}
              resizeMode="contain"
              style={{left: 3, top: 3}}
            />
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 50,
    height: 71,
    marginTop: 3,
  },
  a3: {
    color: 'rgba(255,255,255,1)',
    marginLeft: 5,
    marginTop: 22,
  },
  username: {
    color: 'rgba(233,252,100,1)',
    marginLeft: 9,
    marginTop: 22,
    fontWeight: 'bold',
  },
  leGuastaTuFoto: {
    color: 'rgba(255,255,255,1)',
    marginLeft: 0,
    marginTop: 22,
  },
  imageRow: {
    height: 74,
    flexDirection: 'row',
    marginTop: 17,
  },
  teEnvioUnMensaje: {
    color: 'rgba(255,255,255,1)',
    marginLeft: 0,
    marginTop: 22,
  },
  teMandoUn: {
    color: 'rgba(255,255,255,1)',
    marginTop: 10,
  },
  rect: {
    width: 105,
    height: 37,
    backgroundColor: 'rgba(0,0,0,1)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(233,252,100,1)',
    marginLeft: 22,
    marginTop: 22,
  },
  challenge1: {
    color: 'rgba(233,252,100,1)',
    marginTop: 8,
    marginLeft: 12,
  },
  leGuastaTuFoto2: {
    color: 'rgba(255,255,255,1)',
    marginTop: 22,
  },
  image6: {
    width: 60,
    height: 60,
    marginLeft: 22,
  },

  leGuastaTuFoto2Row: {
    height: 60,
    flexDirection: 'row',
    marginTop: 25,
  },
  teMandoUnRowColumn: {
    width: 193,
    marginLeft: 11,
    marginTop: 8,
    marginBottom: 14,
  },
});
