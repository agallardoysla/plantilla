import React, {useContext} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

let window = Dimensions.get('window');

//Una vez en el home, puedo acceder a los datos del usuario por medio del state user
export default function NewPublicationScreen() {
  const {user, logout} = useContext(AuthContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.text}>Holaa {user.uid}</Text> */}

        <Text style={styles.text_title}>SUBIR RETO</Text>

        <Text style={styles.container_publication} onPress={() => console.log('nueva publicacion..')}>
          <Text style={styles.text_container_publication}>+</Text>
        </Text>

        <Text style={styles.container_button_grabar} onPress={() => console.log('grabando..')}>
          <Text style={styles.text_button}>Grabar</Text>
        </Text>

        <Text style={styles.container_button_cargar} onPress={() => console.log('cargando..')}>
          <Text style={styles.text_button}>Cargar</Text>
        </Text>

        {/* --> NOTA: revisarlo porque al posicionarlo como el tercer no ejecuta el onPress */}
        <Text style={styles.container_button_filtro} onPress={() => console.log('filtro..')}>
          <Text style={styles.text_button}>Filtro</Text>
        </Text>

        <Text style={styles.text_description}>Descripciòn del reto</Text>

        {/* <Text style={styles.text}>New Publication</Text> */}
        {/* <FormButton buttonTitle="Logout" onPress={() => logout()} /> */}
      </View>
    </ScrollView>
  );
}

//configuraciones de estilos y aliniamientos de cada componente
const styles = StyleSheet.create({
  //contenedor general
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    height: window.height
  },

  //titulo
  text_title: {
    fontSize: 20,
    color: '#E9FC64',
    top: 15,
    left: 5,
  },

  //contenedor de nueva publicacion
  container_publication: {
    //ajustar contenedor
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    width: window.width - 100,
    height: window.height - 400,
    top: 18,
    paddingTop: 25,

    //alienar texto con signo +
    textAlign: 'center',
    paddingRight: 50,
    paddingLeft: 50,
  },

  //contendido dentro del contenedor nueva publicacion (signo de +)
  text_container_publication: {
    //ajustar color y tamaño de fuente al texto con signo +
    color: 'white',
    fontSize: 100,
  },

  //grupo de botones
  container_button_grabar: {
    //configurar button
    width: window.width - 200,
    height: 50,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#E9FC64',
    borderRadius: 4,
    top: 30,

    //alinear lo que haya dentro del button
    textAlign: 'center',
    padding: 10,
  },
  container_button_cargar: {
    //configurar button
    width: window.width - 200,
    height: 50,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#E9FC64',
    borderRadius: 4,
    top: 40,

    //alinear lo que haya dentro del button
    textAlign: 'center',
    padding: 10,
  },
  container_button_filtro: {
    //configurar button
    width: window.width - 200,
    height: 50,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#E9FC64',
    borderRadius: 4,
    top: 50,

    //alinear lo que haya dentro del button
    textAlign: 'center',
    padding: 10,
  },

  //texto dentro de cada boton
  text_button: {
    color: 'white',
    fontSize: 20,
  },

  //texto de descripcion
  text_description: {
    fontSize: 18,
    color: '#E9FC64',
    paddingTop: 60,
  },
});
